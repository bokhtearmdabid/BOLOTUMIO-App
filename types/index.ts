export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUri?: string;
}

export interface Character {
  id: string;
  name: string;
  banglaName: string;
  avatar: string;
  personality: string;
  systemPrompt: string;
  gender: 'male' | 'female';
  tags: string[];
}

export interface ChatSession {
  id: string;
  characterId: string;
  characterName: string;
  characterAvatar: string;
  lastMessage: string;
  lastTimestamp: Date;
  messageCount: number;
}