import { connectDb } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connectDb();

export const GET = async (request: NextRequest) => {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
