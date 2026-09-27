import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const getMessagesFilePath = () => path.join(process.cwd(), "data", "messages.json");

async function readMessages(): Promise<ContactMessage[]> {
  try {
    const data = await fs.readFile(getMessagesFilePath(), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]): Promise<void> {
  await fs.writeFile(getMessagesFilePath(), JSON.stringify(messages, null, 2), "utf-8");
}

// GET all messages
export async function GET() {
  try {
    const messages = await readMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load messages." },
      { status: 500 }
    );
  }
}

// PATCH toggle read state
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    const messages = await readMessages();
    const updated = messages.map((msg) =>
      msg.id === id ? { ...msg, read: typeof read === "boolean" ? read : !msg.read } : msg
    );

    await writeMessages(updated);
    return NextResponse.json({ success: true, messages: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update message." },
      { status: 500 }
    );
  }
}

// DELETE a message
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    const messages = await readMessages();
    const filtered = messages.filter((msg) => msg.id !== id);

    await writeMessages(filtered);
    return NextResponse.json({ success: true, messages: filtered });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}
