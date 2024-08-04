import { connectDB } from "@/db/connect";
import ChatSession from "@/models/chatSession";
import Guest from "@/models/guest";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		await connectDB()
		const id = req.nextUrl.searchParams.get('chatbot_id');

		const sessions = await ChatSession.find({
			chatbot_id: id
		}).sort({ created_at: -1 }).populate('guest_id');

		return NextResponse.json({
			sessions,
			success: true
		});

	} catch (error) {
		console.log(error);
		
		return NextResponse.json({
			success: false
		});
	}
}