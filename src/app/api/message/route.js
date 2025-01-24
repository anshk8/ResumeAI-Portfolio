const { openai, supabase } = require("../../utils/config");

// const express = require('express');
// const cors = require('cors');
import { NextResponse } from 'next/server';




// app.use(cors({

   
//     origin: 'https://resume-chat-bot-mmlx-client.vercel.app/',
//     methods:["POST", "GET"],
//     credentials: true

// }));


// app.use(express.json());


//Function to create embedding from user input from Front end
async function createEmbedding(text) {

    //OpenAI embedding function
    try {
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text
        });
        
        return embeddingResponse.data[0].embedding;
    } catch (error) {
        throw new Error(error.message);
    }
}

//Function to find a match via comparing embeddings in supabase vector databse
async function findMatch(embedding) {
    try {

        //Finds 2 matches
        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: 0.50,
            match_count: 2
        });

        if (error) {
            console.error(error);
            throw new Error("Error with semantic search: " + error.message);
        }

        //Returns two matches joined via newline character
        const match = data.map(obj => obj.content).join('\n');
        return match;
  

    } catch (error) {
        throw new Error(error.message);
    }
}

//Function to get chat completion via OpenAI. (More detailed breakdown: We get user input (front end), create an embedding from input, compare embedding with info in supabase, find content similar to embedding, pass the content as answer, pass the user original question as question and ask gpt-4 model to present the answer to us from the question acting as Ansh)
async function getResponse(question, answer) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: "system",
                    content: `You are talking on behalf of Ansh Kakkar, a Computer Science University Student and will present his resume in first person. You will be given context about the student and will answer the question on his behalf. If you do not know the answer to the question or the question is not relevant to the student's resume, respond with 'I don't have that information'. Please do not make up any answers and do not assume anything. When greeted, encourage the user to ask about Ansh and be enthusiastic to have a conversation. Be eager to seek Co-OP/Internship opportunities in the fields of Software Development, AI, Machine Learning, Cloud, Data Science or anything to kickstart your career. Here is the Context: ${answer} , and here is the Question: ${question}`
                }
            ],
            temperature: 0.65,
            frequency_penalty: 0.5
        });

        return completion.choices[0].message.content; 
    } catch (error) {
        throw new Error(error.message);
    }
}


// The API route handler
export async function POST(req) {
    try {
        const { message } = await req.json(); // Use req.json() to parse JSON
        const embedding = await createEmbedding(message);
        const match = await findMatch(embedding);
        const result = await getResponse(message, match || "No match found.");
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {

        const errorMessage =  "Sorry, please ask me once again as something went wrong. If there are nonstop issues, please let Ansh know so he can fix it!"
        return NextResponse.json({errorMessage }, { status: 200 });
    }
}