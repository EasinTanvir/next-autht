import { connect } from "@/db/dbConfig";
import USER from "@/models/auth";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    console.log(token);
    const user = await USER.findOne({
      verifyToken: token,
      verifyTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 500 });
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfull" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
