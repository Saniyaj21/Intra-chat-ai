import { connectDB } from "@/db/connect";
import Chatbot from "@/models/chatbot";
import ChatSession from "@/models/chatSession";
import { NextResponse } from "next/server";


export async function GET(req) {

	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('chatbot_id');
		console.log(id);
		const sessions = await ChatSession.find({
			chatbot_id: id
		}).sort({ created_at: -1 });

		return NextResponse.json({
			sessions,
			success: true
		});
	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}