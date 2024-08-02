import { connectDB } from "@/db/connect";
import Chatbot from "@/models/chatbot";
import ChatSession from "@/models/chatSession";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(req) {

    try {
        console.log('.........................................................................')
        connectDB()
        const { userId } = auth();
        const chatbots = await Chatbot.find({
            clerk_user_id: userId
        }).sort({ created_at: -1 });


        console.log(chatbots)

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