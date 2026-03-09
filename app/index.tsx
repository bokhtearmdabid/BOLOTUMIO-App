import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CHARACTERS } from '../constants/characters';
import CharacterCard from '../components/CharacterCard';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CHARACTERS}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Text style={styles.heroEmoji}>🤖</Text>
              <Text style={styles.heroTitle}>বলো তুমিও</Text>
              <Text style={styles.heroSub}>তোমার AI বন্ধু বেছে নাও</Text>
              <TouchableOpacity
                style={styles.historyBtn}
                onPress={() => router.push('/history' as any)}
              >
                <Text style={styles.historyBtnText}>📜 চ্যাট হিস্টোরি দেখো</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>✨ সব চরিত্র</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => router.push(`/chat/${item.id}` as any)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a14' },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  hero: { alignItems: 'center', paddingVertical: 32, marginBottom: 8 },
  heroEmoji: { fontSize: 56, marginBottom: 12 },
  heroTitle: { color: '#c084fc', fontSize: 36, fontWeight: 'bold' },
  heroSub: { color: '#666', fontSize: 15, marginTop: 6 },
  historyBtn: {
    marginTop: 20,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#c084fc',
  },
  historyBtnText: { color: '#c084fc', fontSize: 14, fontWeight: '600' },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});