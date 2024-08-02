import { connectDB } from "@/db/connect";
import { NextResponse } from "next/server";
import Message from "@/models/message";
import ChatSession from "@/models/chatSession";
import Chatbot from "@/models/chatbot";


export async function GET(req) {

	try {
		connectDB()
		const session_id = req.nextUrl.searchParams.get('session_id');
		
		const messages = await Message.find({
			chat_session_id: session_id
		});
	
		const guest = await ChatSession.findById(session_id).populate('guest_id');
		console.log("Guest ----------------------------", guest);

		return NextResponse.json({
			messages,
			guest,
			success: true
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false
		});
	}
}