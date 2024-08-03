import { connectDB } from "@/db/connect";
import ChatSession from "@/models/chatSession";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('chatbot_id');

		const sessions = await ChatSession.find({
			chatbot_id: id
		}).populate('guest_id').sort({ created_at: -1 });

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