import { Message } from '../types';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export async function sendMessage(
  messages: Message[],
  systemPrompt: string,
  userInput: string
): Promise<string> {
  // Build conversation history
  const history = messages.slice(-10).map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      ...history,
      { role: 'user', parts: [{ text: userInput }] },
    ],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'দুঃখিত, আমি এখন উত্তর দিতে পারছি না।';
}