import { NextResponse } from "next/server";
import { connectToAtlas } from "@utils/database";
import Prompt from "@models/prompt";

export async function POST (request) {
  const searchTextRaw = await request.json()
  const searchText = searchTextRaw.searchText
  try {
    await connectToAtlas();
    const prompts = await Prompt.aggregate([
      {
        $search: {
          index:'share-prompts',
          text: {
            query: searchText,
            path: {
              'wildcard': '*'
            },
            fuzzy: {
              maxEdits: 1
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator'
        }
      },
      {
        $unwind: '$creator'
      }
    ]);
    return NextResponse.json({ prompts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to search prompts", {status: 500});
  }
}



