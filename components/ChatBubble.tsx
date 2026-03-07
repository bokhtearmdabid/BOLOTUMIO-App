import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';

interface Props {
  message: Message;
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
      <Text style={styles.time}>
        {new Date(message.timestamp).toLocaleTimeString('bn-BD', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#7c3aed',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#1e1e3a',
    borderBottomLeftRadius: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
  },
  time: {
    color: '#555',
    fontSize: 10,
    marginTop: 2,
    marginHorizontal: 4,
  },
});