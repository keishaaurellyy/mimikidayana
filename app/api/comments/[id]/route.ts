import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "@/lib/database";

// DELETE /api/comments/:id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteComment(Number(id));
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
