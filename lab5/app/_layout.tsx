import {Navigator, Stack} from "expo-router";
import Slot = Navigator.Slot;

export default function RootLayout() {
  <AuthProvider>
    <Slot />
  </AuthProvider>
}
