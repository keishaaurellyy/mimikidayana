import { NextRequest, NextResponse } from "next/server";
import { getProfile, createProfile, updateProfile } from "@/lib/database";
import { revalidatePath } from "next/cache";

// GET /api/profiles — returns single profile (matches Strapi controller: limit 1)
export async function GET() {
  try {
    const profile = await getProfile();
    if (!profile) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

// POST /api/profiles — create a new profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profile = await createProfile(body);
    revalidatePath("/");
    revalidatePath("/profile");
    return NextResponse.json({ data: profile }, { status: 201 });
  } catch (error) {
    console.error("Failed to create profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
}

// PUT /api/profiles — update existing profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }
    const profile = await updateProfile(id, data);
    revalidatePath("/");
    revalidatePath("/profile");
    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
