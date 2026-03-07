import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { CHARACTERS } from '../../constants/characters';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0f0f1a' }}>
      {/* Title */}
      <View style={{ padding: 24, paddingTop: 60 }}>
        <Text style={{ color: '#a78bfa', fontSize: 28, fontWeight: 'bold' }}>বলো তুমিও 💬</Text>
        <Text style={{ color: '#666', marginTop: 4 }}>তোমার AI বন্ধু বেছে নাও</Text>
      </View>

      {/* Character Cards */}
      <FlatList
        data={CHARACTERS}
        horizontal={false}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/chat/${item.id}`)}
            style={{
              backgroundColor: '#1a1a2e', borderRadius: 20,
              padding: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center',
              borderWidth: 1, borderColor: '#2a2a4a',
            }}
          >
            <Text style={{ fontSize: 48 }}>{item.avatar}</Text>
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{item.banglaName}</Text>
              <Text style={{ color: '#a78bfa', marginTop: 2 }}>{item.tags.join(' • ')}</Text>
              <Text style={{ color: '#555', marginTop: 6, fontSize: 12 }}>
                {item.gender === 'female' ? '👩 মেয়ে বন্ধু' : '👨 ছেলে বন্ধু'}
              </Text>
            </View>
            <Text style={{ color: '#7c3aed', fontSize: 24 }}>›</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}