import { useState, useCallback } from 'react';
import { Message, ChatSession } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAT_KEY = 'bolotumio_chat';
const SESSIONS_KEY = 'bolotumio_sessions';

export function useChatStore(characterId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(`${CHAT_KEY}_${characterId}`);
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {
      console.error('Load error:', e);
    }
  }, [characterId]);

  const saveMessages = useCallback(async (msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(`${CHAT_KEY}_${characterId}`, JSON.stringify(msgs));
    } catch (e) {
      console.error('Save error:', e);
    }
  }, [characterId]);

  const updateSession = useCallback(async (
    characterName: string,
    characterAvatar: string,
    lastMessage: string,
    count: number
  ) => {
    try {
      const raw = await AsyncStorage.getItem(SESSIONS_KEY);
      const sessions: ChatSession[] = raw ? JSON.parse(raw) : [];
      const idx = sessions.findIndex((s) => s.id === characterId);
      const session: ChatSession = {
        id: characterId,
        characterId,
        characterName,
        characterAvatar,
        lastMessage,
        lastTimestamp: new Date(),
        messageCount: count,
      };
      if (idx >= 0) sessions[idx] = session;
      else sessions.unshift(session);
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Session error:', e);
    }
  }, [characterId]);

  const addMessage = useCallback(async (
    msg: Message,
    characterName?: string,
    characterAvatar?: string,
    totalCount?: number
  ) => {
    setMessages((prev) => {
      const updated = [...prev, msg];
      saveMessages(updated);
      if (characterName && characterAvatar) {
        updateSession(
          characterName,
          characterAvatar,
          msg.content.slice(0, 60),
          totalCount ?? updated.length
        );
      }
      return updated;
    });
  }, [saveMessages, updateSession]);

  const clearMessages = useCallback(async () => {
    setMessages([]);
    await AsyncStorage.removeItem(`${CHAT_KEY}_${characterId}`);
  }, [characterId]);

  return {
    messages,
    loading,
    setLoading,
    loadMessages,
    addMessage,
    clearMessages,
  };
}

// ✅ This must be at the bottom — standalone export
export async function getAllSessions(): Promise<ChatSession[]> {
  try {
    const raw = await AsyncStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}