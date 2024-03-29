import { connectDb } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connectDb();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists", user);

    // checking password
    const validPassword = await bcryptjs.compare(password, user.passwod);

    if (!validPassword) {
      return NextResponse.json(
        { error: "invalid credentails" },
        { status: 400 }
      );
    }
    // creating jwt token
    //first create token data
    const tokenData = {
      Id: user._id,
      email: user.email,
      password: user.password,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in Successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
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
