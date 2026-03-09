import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChatSession } from '../types';
import { getAllSessions } from '../store/chatStore';

export default function HistoryScreen() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllSessions().then(setSessions);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyText}>এখনো কোনো চ্যাট নেই</Text>
            <Text style={styles.emptySubtext}>কারো সাথে কথা বলা শুরু করো!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/chat/${item.characterId}` as any)}
          >
            <Text style={styles.avatar}>{item.characterAvatar}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.characterName}</Text>
              <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
              <Text style={styles.count}>{item.messageCount} টি বার্তা</Text>
            </View>
            <Text style={styles.time}>
              {new Date(item.lastTimestamp).toLocaleDateString('bn-BD')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a14' },
  list: { padding: 16 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptySubtext: { color: '#555', marginTop: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13131f',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  avatar: { fontSize: 40 },
  info: { flex: 1, marginLeft: 14 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  lastMsg: { color: '#666', fontSize: 13, marginTop: 3 },
  count: { color: '#c084fc', fontSize: 11, marginTop: 4 },
  time: { color: '#444', fontSize: 11 },
});