import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, subject, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Please enter a subject (at least 3 characters)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a message with at least 10 characters." },
        { status: 400 }
      );
    }

    // Persist to messages.json
    const messagesFilePath = path.join(process.cwd(), "data", "messages.json");
    let currentMessages = [];
    try {
      const fileData = await fs.readFile(messagesFilePath, "utf-8");
      currentMessages = JSON.parse(fileData);
    } catch {
      currentMessages = [];
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    currentMessages.unshift(newMessage);
    await fs.writeFile(messagesFilePath, JSON.stringify(currentMessages, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been received successfully.",
        messageId: newMessage.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message. Please try again." },
      { status: 500 }
    );
  }
}
