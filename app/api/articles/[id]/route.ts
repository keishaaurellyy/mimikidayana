import { NextRequest, NextResponse } from "next/server";
import {
  getArticleById,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
} from "@/lib/database";

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
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
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

// PUT /api/articles/:id — update article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const article = await updateArticle(Number(id), body);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ data: article });
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 },
    );
  }
}

// DELETE /api/articles/:id — delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteArticle(Number(id));
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 },
    );
  }
}
