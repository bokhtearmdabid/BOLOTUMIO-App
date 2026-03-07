import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CHARACTERS } from '../../constants/characters';
import { sendMessage } from '../../services/gemini';
import { Message } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const character = CHARACTERS.find((c) => c.id === id)!;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: uuidv4(), role: 'user',
      content: input.trim(), timestamp: new Date(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendMessage(messages, character.systemPrompt, input.trim());
      const aiMsg: Message = {
        id: uuidv4(), role: 'assistant',
        content: reply, timestamp: new Date(),
      };
      setMessages([...newMessages, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0f0f1a' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={{ padding: 16, backgroundColor: '#1a1a2e', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 32 }}>{character.avatar}</Text>
        <View style={{ marginLeft: 12 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{character.banglaName}</Text>
          <Text style={{ color: '#a78bfa', fontSize: 12 }}>{character.tags.join(' • ')}</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={(m) => m.id}
        onContentSizeChange={() => flatRef.current?.scrollToEnd()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{
            alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: item.role === 'user' ? '#7c3aed' : '#1e1e3a',
            borderRadius: 16, padding: 12, marginVertical: 4, maxWidth: '80%',
          }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>{item.content}</Text>
          </View>
        )}
        ListFooterComponent={loading ? (
          <View style={{ alignSelf: 'flex-start', padding: 12 }}>
            <ActivityIndicator color="#a78bfa" />
          </View>
        ) : null}
      />

      {/* Input */}
      <View style={{ flexDirection: 'row', padding: 12, backgroundColor: '#1a1a2e' }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="বার্তা লিখুন..."
          placeholderTextColor="#666"
          style={{
            flex: 1, backgroundColor: '#2a2a4a', color: '#fff',
            borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15,
          }}
          multiline
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{
            marginLeft: 8, backgroundColor: '#7c3aed',
            borderRadius: 24, paddingHorizontal: 20, justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}