import { connectDB } from "@/db/connect";
import Chatbot from "@/models/chatbot";
import ChatSession from "@/models/chatSession";
import Guest from "@/models/guest";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function GET(req) {

	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('id');
		const chatbot = await Chatbot.findById(id);

		return NextResponse.json({
			chatbot,
			success: true
		});
	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}
export async function DELETE(req) {
	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('id');
		const chatbot = await Chatbot.findByIdAndDelete(id);

		return NextResponse.json({
			success: true
		});
	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}
export async function POST(req) {
	try {
		const body = await req.json()
		console.log("===========================================",)
		connectDB()
	
		const guest = await Guest.create({
			name:body.name,
			email:body.email
		})
		console.log(guest);
		const chatSession = await ChatSession.create({
			chatbot_id: body.id,
			guest_id: guest._id
	
		})
		const message = await Message.create({
			chat_session_id: chatSession._id,
			content: `Hello ${guest.name}, How Can I help you?`,
			sender:"ai"
		})

		return NextResponse.json({
			success: true,
			chatSession
		});
	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}