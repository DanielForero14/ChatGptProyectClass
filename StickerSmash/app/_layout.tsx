import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{title: "Home"}}></Stack.Screen>
    <Stack.Screen name="welcome" options={{title: "Bienvenidos"}}></Stack.Screen>
    <Stack.Screen name="splashscreen" options={{headerShown:false}}></Stack.Screen>
    
    </Stack>;
}
