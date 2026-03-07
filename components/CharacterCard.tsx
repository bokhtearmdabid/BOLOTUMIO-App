import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Character } from '../types';

interface Props {
  character: Character;
  onPress: () => void;
}

export default function CharacterCard({ character, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.avatar}>{character.avatar}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{character.banglaName}</Text>
        <Text style={styles.tags}>{character.tags.join(' • ')}</Text>
        <Text style={styles.gender}>
          {character.gender === 'female' ? '👩 মেয়ে' : '👨 ছেলে'}
        </Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  avatar: { fontSize: 48 },
  info: { marginLeft: 16, flex: 1 },
  name: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  tags: { color: '#a78bfa', marginTop: 2, fontSize: 12 },
  gender: { color: '#555', marginTop: 6, fontSize: 12 },
  arrow: { color: '#7c3aed', fontSize: 28 },
});