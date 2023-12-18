import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request) {
  const data = await request.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = data;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);

  return NextResponse.json({
    geminiResponse: text,
  });
}
