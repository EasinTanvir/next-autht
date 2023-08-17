import { connect } from "@/db/dbConfig";
import USER from "@/models/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  let hashPass, user, token;

  const { email, password } = await req.json();

  try {
    user = await USER.findOne({ email });
  } catch (err) {
    return NextResponse.json({ message: "find user failed" }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ message: "No user found" }, { status: 404 });
  }

  try {
    hashPass = await bcrypt.compare(password, user.password);
  } catch (err) {
    return NextResponse.json(
      { message: "hashpassword failed" },
      { status: 500 }
    );
  }

  if (!hashPass) {
    return NextResponse.json({ message: "Invalid password" }, { status: 500 });
  }

  try {
    token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.TOKEN_KEY!,
      { expiresIn: "1d" }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "create token failed" },
      { status: 201 }
    );
  }

  const response = NextResponse.json(
    { message: "login success", auth: user },
    { status: 201 }
  );
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
