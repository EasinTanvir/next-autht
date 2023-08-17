import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ message: "Logout Success" });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (err: any) {
    NextResponse.json({ message: err.message }, { status: 500 });
  }
}
