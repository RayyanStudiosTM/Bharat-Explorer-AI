"use server";

import { GoogleGenerativeAI } from "@google/genai";

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) throw new Error("❌ Missing GOOGLE_GENAI_API_KEY in .env.local");

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const geminiPro = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
