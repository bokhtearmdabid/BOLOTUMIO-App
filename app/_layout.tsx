import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f0f1a' },
        headerTintColor: '#a78bfa',
        headerTitleStyle: { color: '#ffffff' },
        contentStyle: { backgroundColor: '#0f0f1a' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'বলো তুমিও 💬' }} />
      <Stack.Screen name="chat/[id]" options={{ title: '' }} />
    </Stack>
  );
}