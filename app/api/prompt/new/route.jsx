import { NextResponse } from "next/server";
import { connectToAtlas } from "@utils/database";
import Prompt from "@models/prompt";

export async function POST (req, res) {
  const { prompt, userId, tag } = await req.json()

  try {
    await connectToAtlas();
    const newPrompt = new Prompt({
      prompt,
      creator: userId,
      tag,
      createdAt: new Date(),
    });
    await newPrompt.save();
    return new Response(
      JSON.stringify(newPrompt), {status: 200}
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create prompt", {status: 500});
  }
}
