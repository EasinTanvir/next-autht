import { connect } from "@/db/dbConfig";
import USER from "@/models/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/nodeMailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    const existUser = await USER.findOne({ email });

    if (existUser) {
      return NextResponse.json({ message: "email exist" }, { status: 500 });
    }

    if (password.trim().length < 6) {
      return NextResponse.json(
        { message: "password at least 6 character" },
        { status: 500 }
      );
    }

    let hashPass;
    const salt = await bcrypt.genSalt(10);
    hashPass = await bcrypt.hash(password, salt);

    let newUser;
    try {
      newUser = await USER.create({ username, email, password: hashPass });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Create user failed" },
        { status: 500 }
      );
    }
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
