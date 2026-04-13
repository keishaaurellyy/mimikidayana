import { NextRequest, NextResponse } from "next/server";
import {
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/database";
import { revalidatePath } from "next/cache";

// GET /api/testimonials/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const testimonial = await getTestimonialById(Number(id));
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: testimonial });
  } catch (error) {
    console.error("Failed to fetch testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 },
    );
  }
}

// PUT /api/testimonials/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonial = await updateTestimonial(Number(id), body);
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 },
      );
    }
    revalidatePath("/");
    revalidatePath("/testimoni");
    return NextResponse.json({ data: testimonial });
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 },
    );
  }
}

// DELETE /api/testimonials/:id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteTestimonial(Number(id));
    revalidatePath("/");
    revalidatePath("/testimoni");
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 },
    );
  }
}
