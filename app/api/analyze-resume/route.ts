import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Analyze Resume API is working!",
  });
}

export async function POST(req: NextRequest) {
  try {
   
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const { resumeUrl } = await req.json();

    if (!resumeUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume URL is required.",
        },
        { status: 400 }
      );
    }

    
    const fileResponse = await fetch(resumeUrl);

    if (!fileResponse.ok) {
      throw new Error("Failed to download resume.");
    }

    const buffer = Buffer.from(await fileResponse.arrayBuffer());

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: buffer.toString("base64"),
              },
            },
            {
              text: `
Analyze this resume.

Return ONLY valid JSON.

{
  "resumeScore": 85,
  "atsScore": 90,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "professionalSummary": ""
}
              `,
            },
          ],
        },
      ],
    });

   
    const analysis = JSON.parse(result.text ?? "{}");


    await prisma.resume.create({
      data: {
        fileName: "Resume.pdf",
        fileUrl: resumeUrl,
        extractedText: analysis.professionalSummary ?? "",
        resumeScore: analysis.resumeScore ?? 0,
        suggestions: JSON.stringify(analysis.suggestions ?? []),
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      analysis,
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