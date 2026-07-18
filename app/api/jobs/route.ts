import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { skills } = await req.json();

    const query = skills.join(" ");

    const response = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      jobs: data.jobs || [],
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      jobs: [],
      message: "Unable to fetch jobs",
    });
  }
}