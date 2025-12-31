import { NextResponse } from "next/server";

let pastes: { id: number; content: string }[] = [];

export async function GET() {
  return NextResponse.json(pastes);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  const newPaste = {
    id: Date.now(),
    content: body.content,
  };

  pastes.push(newPaste);

  return NextResponse.json(newPaste);
}