import { NextRequest, NextResponse } from "next/server";
import { getArticleById, getArticleBySlug } from "@/lib/database";

// GET /api/articles/:id — find article by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Try by numeric ID first, then by slug
    let article = null;
    if (/^\d+$/.test(id)) {
      article = await getArticleById(Number(id));
    }
    if (!article) {
      article = await getArticleBySlug(id);
    }

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: article });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
