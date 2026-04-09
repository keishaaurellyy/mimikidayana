import { NextRequest, NextResponse } from "next/server";
import { createComment, getComments } from "@/lib/database";

export async function GET() {
  try {
    const comments = await getComments();
    return NextResponse.json({ data: comments });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phoneNumber, aspiration } = await request.json();

    // Required fields validation
    if (!name || !email || !phoneNumber || !aspiration) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format. Example: example@mail.com" },
        { status: 400 },
      );
    }

    // Phone number validation (8-15 digits)
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        {
          error:
            "Phone number must contain only numbers (8-15 digits). Example: 08123456789",
        },
        { status: 400 },
      );
    }

    const comment = await createComment({
      name,
      email,
      phoneNumber,
      aspiration,
    });

    return NextResponse.json(
      {
        message: "Comment submitted successfully",
        data: {
          id: comment.id,
          name: comment.name,
          email: comment.email,
          phoneNumber: comment.phone_number,
          aspiration: comment.aspiration,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
