import { connectDB } from "@/db/connect";
import { NextResponse } from "next/server";
import Message from "@/models/message";

export async function GET(req) {

	try {
		connectDB()
		const session_id = req.nextUrl.searchParams.get('session_id');

		const messages = await Message.find({
			chat_session_id: session_id
		});

		return NextResponse.json({
			messages,
			success: true
		});

	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}