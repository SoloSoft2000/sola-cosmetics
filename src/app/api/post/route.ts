import { NextRequest } from "next/server";
import { getPostById, getPostList } from "./postUtils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lng = searchParams.get("lng") || "en";
  const filename = searchParams.get("filename") || "";

  if (!lng) {
    return new Response(JSON.stringify({ error: "Language not specified" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (filename) {
      const post = await getPostById(lng, `${filename}.json`);
      if (!post) {
        return new Response(JSON.stringify({ error: "File not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    const posts = await getPostList(lng);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}