import { connectDB } from "@/db/connect";
import Chatbot from "@/models/chatbot";
import ChatbotChar from "@/models/chatbotCharacteristics";
import { NextResponse } from "next/server";

export async function GET(req) {

	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('id');
		const chatbot = await Chatbot.findById(id);
		const chars = await ChatbotChar.find({
			chatbot_id: id
		})

		console.log(chars);

		return NextResponse.json({
			chars,
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
		const id = req.nextUrl.searchParams.get('char_id');
		await ChatbotChar.findByIdAndDelete(id)
		
		console.log(id);

		return NextResponse.json({
			
			success: true
		});
	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}
