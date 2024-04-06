import registerUser from "@/app/lib/Mongodb/register";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    let body = await req.json();
    if (!body.username || !body.password) {
        return NextResponse.json({message: 'Username and password are required!'}, {status: 400});
    }
    registerUser(body.username, body.password);
    return NextResponse.json({ message: 'User registered successfully!' });
} 