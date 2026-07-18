import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function GET() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Say only: Gemini is working!",
    });

    const text =
      result.text ??
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "";

    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}