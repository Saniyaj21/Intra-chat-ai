import { NextResponse } from "next/server";

export async function GET(req) {
	
	console.log("params",req.url);
	return NextResponse.json({
		message: "Sever is Healty.",
	});
}