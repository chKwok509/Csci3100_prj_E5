import authenticateUser from "@/app/lib/Mongodb/authuser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    let body = await req.json();
    if (!body.username || !body.password) {
        return NextResponse.json({message: 'Username and password are required!' }, { status: 400 });
    }
    const authenticated = await authenticateUser(body.username, body.password);
    if (authenticated) {
        return NextResponse.json({ message: 'User authenticated successfully!' });
    } else {
        return NextResponse.json({ message: 'Invalid username or password!' }, { status: 400 });
    }
}