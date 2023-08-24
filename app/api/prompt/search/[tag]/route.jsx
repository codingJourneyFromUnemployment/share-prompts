import { NextResponse } from "next/server";
import { connectToAtlas } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export async function GET(request, { params }) {
  try {
    await connectToAtlas();
    const prompts = await Prompt.find({tag : params.tag}).populate("creator");
    if(!prompts) {
      return NextResponse.json("Prompts not found", { status: 404 });
    } else {
      return NextResponse.json({ prompts }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to get prompts", { status: 500 });
  }
}