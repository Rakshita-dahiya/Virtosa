 import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY_CR,
});

export async function POST(req: NextRequest) {
  try {
    const { targetRole } = await req.json();

    if (!targetRole) {
      return NextResponse.json(
        {
          success: false,
          message: "Target role is required.",
        },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI career mentor. Always return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
Create a detailed career roadmap for becoming a ${targetRole}.

Return ONLY valid JSON in this format:

{
  "role": "",
  "currentLevel": "Beginner",
  "estimatedTime": "",
  "progress": 0,
  "recommendedProject": "",
  "nextStep": "",
  "phases": [
    {
      "title": "",
      "icon": "",
      "status": "completed",
      "skills": []
    }
  ]
}
          `,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      analysis: text,
    });
  } catch (error: any) {
    console.error("Groq Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}