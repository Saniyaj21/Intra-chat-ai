import { connectDB } from "@/db/connect";
import Chatbot from "@/models/chatbot";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {
        connectDB()
        const { userId } = auth();

        const chatbots = await Chatbot.find({
            clerk_user_id: userId
        }).sort({ created_at: -1 });

        return NextResponse.json({
            chatbots,
            success: true
        });

    } catch (error) {
        return NextResponse.json({
            success: false
        });
    }
}