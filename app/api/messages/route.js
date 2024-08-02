// import { connectDB } from "@/db/connect";
// import { NextResponse } from "next/server";
// import Message from "@/models/message";
// import ChatSession from "@/models/chatSession";


// export async function GET(req) {

// 	try {
// 		connectDB()
// 		const id = req.nextUrl.searchParams.get('session_id');
// 		const messages = await Message.find({
// 			chat_session_id: id
// 		});

// 		console.log("()()()()()()()()", messages);
		

// 		return NextResponse.json({
// 			messages,
// 			success: true
// 		});
// 	} catch (error) {
// 		return NextResponse.json({
// 			success: false
// 		});
// 	}
// }