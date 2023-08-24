import { NextResponse } from "next/server";
import { connectToAtlas } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export async function GET(request, { params }) {
  try {
    await connectToAtlas();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if(!prompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    } else {
      return NextResponse.json({ prompt }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to get prompt", { status: 500 });
  }
}

// PATCH (update)
export async function PATCH(request, { params }) {
  try {
    const { prompt, tag } = await request.json();
    const exsitingPrompt = await Prompt.findById(params.id);
    if (!exsitingPrompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    } else {
      exsitingPrompt.prompt = prompt;
      exsitingPrompt.tag = tag;
      await exsitingPrompt.save();
      return NextResponse.json("update successful", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", { status: 500 });
  }
}

// DELETE (delete)
export async function DELETE(request, { params }) {
  try {
    const exsitingPrompt = await Prompt.findById(params.id);
    if (!exsitingPrompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    } else {
      await Prompt.deleteOne({ _id: params.id });
      return NextResponse.json("delete successful", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
}

