import { NextRequest, NextResponse } from "next/server";
import { getArticles, createArticle } from "@/lib/database";

// GET /api/articles?category=news — list articles, optional category filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;

    const articles = await getArticles(category);
    return NextResponse.json({ data: articles });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}

// POST /api/articles — create a new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const article = await createArticle(body);
    return NextResponse.json({ data: article }, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}
