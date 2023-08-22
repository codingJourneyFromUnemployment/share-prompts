import { NextResponse } from "next/server";
import { connectToAtlas } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET () {
  try {
    await connectToAtlas();
    const prompts = await Prompt.find().populate('creator')
    return NextResponse.json(prompts, {status: 200})
  } catch (err) {
    console.log(err);
    return NextResponse.json("Error fetching prompts", {status: 500})
  }
}