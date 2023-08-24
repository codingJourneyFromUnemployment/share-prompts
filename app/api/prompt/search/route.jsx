import { NextResponse } from "next/server";
import { connectToAtlas } from "@utils/database";
import Prompt from "@models/prompt";

export async function POST (request) {
  const searchTextRaw = await request.json()
  const searchText = searchTextRaw.searchText
  try {
    await connectToAtlas();
    console.log(searchText);
    const prompts = await Prompt.aggregate([
      {
        $search: {
          text: {
            query: searchText,
            path: "prompt",
          },
        },
      }
    ]);
    console.log(prompts);
    return NextResponse.json({ prompts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to search prompts", {status: 500});
  }

  // try {
  //   await connectToAtlas();
  //   const newPrompt = new Prompt({
  //     prompt,
  //     creator: userId,
  //     tag,
  //     createdAt: new Date(),
  //   });
  //   await newPrompt.save();
  //   return new Response(
  //     JSON.stringify(newPrompt), {status: 200}
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return new Response("Failed to create prompt", {status: 500});
  // }
}



