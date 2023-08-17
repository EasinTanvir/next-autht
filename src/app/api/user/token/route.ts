import { getTokenData } from "@/helper/getTokenData";
import USER from "@/models/auth";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";

connect();
export async function GET(req: NextRequest) {
  try {
    const tokenData = await getTokenData(req);

    if (tokenData) {
      const user = await USER.findOne({ _id: tokenData.id }).select(
        "-password"
      );
      return NextResponse.json({ user }, { status: 200 });
    }
  } catch (err: any) {
    return NextResponse.json({ message: "fetchuser failed" }, { status: 500 });
  }
}
