import { useState, useCallback } from 'react';
import { Message, ChatSession } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'bolotumio_chats';

export function useChatStore(characterId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(`${STORAGE_KEY}_${characterId}`);
      if (raw) {
        const parsed: Message[] = JSON.parse(raw);
        setMessages(parsed);
      }
    } catch (e) {
      console.error('Load error:', e);
    }
  }, [characterId]);

  const saveMessages = useCallback(async (msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEY}_${characterId}`,
        JSON.stringify(msgs)
      );
    } catch (e) {
      console.error('Save error:', e);
    }
  }, [characterId]);

  const addMessage = useCallback(async (msg: Message) => {
    setMessages((prev) => {
      const updated = [...prev, msg];
      saveMessages(updated);
      return updated;
    });
  }, [saveMessages]);

  const clearMessages = useCallback(async () => {
    setMessages([]);
    await AsyncStorage.removeItem(`${STORAGE_KEY}_${characterId}`);
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