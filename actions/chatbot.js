'use server'

import Chatbot from '@/models/chatbot'
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/db/connect';
import { redirect } from 'next/navigation';

export async function createChatbot(formData) {
    console.log(formData)
    const { userId } = auth();
    connectDB()
    const chatbot = await Chatbot.create({

        clerk_user_id: userId,
        name: formData.get('chatbot_name'),

    })

    redirect(`/edit-chatbot/${chatbot._id}`)

}
export async function getChatbotName(id) {

    try {
        console.log(id);
        connectDB()
        const chatbot = await Chatbot.findById(id);
        return { chatbotName: chatbot.name }
    } catch (error) {
        console.log(error)
    }

}
