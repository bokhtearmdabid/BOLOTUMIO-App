import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#0a0a14" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a14' },
          headerTintColor: '#c084fc',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 18,
          },
          contentStyle: { backgroundColor: '#0a0a14' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'বলো তুমিও' }}
        />
        <Stack.Screen
          name="chat/[id]"
          options={{ title: '' }}
        />
        <Stack.Screen
          name="history"
          options={{ title: '📜 চ্যাট হিস্টোরি' }}
        />
      </Stack>
    </>
  );
}