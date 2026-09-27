import { NextResponse } from "next/server";
import {
  getNavigation,
  getProfile,
  getSkills,
  getExperiences,
  getServices,
  getProjects,
  saveNavigation,
  saveProfile,
  saveSkills,
  saveExperiences,
  saveServices,
  saveProjects,
} from "@/lib/content";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    if (section === "navigation") {
      const data = await getNavigation();
      return NextResponse.json({ success: true, data });
    }
    if (section === "profile") {
      const data = await getProfile();
      return NextResponse.json({ success: true, data });
    }
    if (section === "skills") {
      const data = await getSkills();
      return NextResponse.json({ success: true, data });
    }
    if (section === "experience") {
      const data = await getExperiences();
      return NextResponse.json({ success: true, data });
    }
    if (section === "services") {
      const data = await getServices();
      return NextResponse.json({ success: true, data });
    }
    if (section === "projects") {
      const data = await getProjects();
      return NextResponse.json({ success: true, data });
    }

    // Default: return all sections
    const [navigation, profile, skillsData, experienceData, servicesData, projects] =
      await Promise.all([
        getNavigation(),
        getProfile(),
        getSkills(),
        getExperiences(),
        getServices(),
        getProjects(),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        navigation,
        profile,
        skills: skillsData,
        experience: experienceData,
        services: servicesData,
        projects,
      },
    });
  } catch (error) {
    console.error("Error loading content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content data." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { error: "Section and data are required." },
        { status: 400 }
      );
    }

    switch (section) {
      case "navigation":
        await saveNavigation(data);
        break;
      case "profile":
        await saveProfile(data);
        break;
      case "skills":
        await saveSkills(data);
        break;
      case "experience":
        await saveExperiences(data);
        break;
      case "services":
        await saveServices(data);
        break;
      case "projects":
        await saveProjects(data);
        break;
      default:
        return NextResponse.json(
          { error: `Unknown section: ${section}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Section '${section}' saved successfully.`,
    });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content." },
      { status: 500 }
    );
  }
}
