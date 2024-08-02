'use server'

import Chatbot from '@/models/chatbot'
import ChatbotChar from '@/models/chatbotCharacteristics'
import Message from '@/models/message'

import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/db/connect';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Guest from '@/models/guest'
import ChatSession from '@/models/chatSession';

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

export async function addCharacteristics(formData) {
    console.log(formData)
    connectDB()
    const chatChar = await ChatbotChar.create({
        chatbot_id: formData.get('chatbotId'),
        content: formData.get('characteristics'),

    })
    console.log(chatChar);
    revalidatePath(`/edit-chatbot/${chatChar.chatbot_id}`)

}


