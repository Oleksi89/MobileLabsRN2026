import {Slot} from "expo-router";
import {AuthProvider, useAuth} from "@/context/AuthContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActivityIndicator, StyleSheet, View} from "react-native";


function RootLayoutNav() {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={styles.container1}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return <Slot />;
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <RootLayoutNav />
            </AuthProvider>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    container1: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});