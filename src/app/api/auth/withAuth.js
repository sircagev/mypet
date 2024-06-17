import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

const withAuth = async (request) => {
  try {
    const cookieStore = cookies();
    const myPetToken = cookieStore.get("myPetToken");

    if (!myPetToken) {
      return NextResponse.json({
        error: "Not logged in"
      }, { status: 400 });
    }

    const user = jwt.verify(myPetToken.value, process.env.JWT_SECRET);

    return NextResponse.json(user);

  } catch (error) {
    console.log(error)
    throw new Error("Invalid token");;
  }
};

export default withAuth;
