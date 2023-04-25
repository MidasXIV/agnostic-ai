import { getOpenAIInstance } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response) {

  const { prompt } = (await request.json());
  console.log(prompt);
  if(!prompt) {
    return NextResponse.error();
  }
  try {
    const openai = getOpenAIInstance();

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });

    console.log(completion.data);

    return new Response(completion.data.choices[0].text);

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  
}
