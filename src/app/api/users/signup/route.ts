import { connectDb } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connectDb();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }
    const saltRounds = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    // send verification email

    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
    return NextResponse.json({
      message:"user registered successfully",
      success:true,
      savedUser
  })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
