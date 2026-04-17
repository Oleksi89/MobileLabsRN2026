import React, {useState} from 'react';
import {Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, View} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {useAuth} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {resetPassword} = useAuth();
    const router = useRouter();

    const handleReset = async () => {
        if (!email) {
            Alert.alert('Помилка', 'Будь ласка, введіть ваш email');
            return;
        }

        try {
            setLoading(true);
            await resetPassword(email);
            Alert.alert(
                'Успіх',
                'Лист для відновлення паролю відправлено на вашу пошту.',
                [{text: 'ОК', onPress: () => router.back()}]
            );
        } catch (error) {
            Alert.alert('Помилка', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Відновлення паролю</Text>
            <Text style={styles.subtitle}>Введіть email, на який зареєстровано акаунт</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF"/>
            ) : (
                <Button title="Надіслати посилання" onPress={handleReset}/>
            )}

            <Link href="/login" style={styles.link}>
                Повернутися до входу
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff'},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'},
    subtitle: {fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center'},
    input: {borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8},
    link: {marginTop: 15, color: '#007AFF', textAlign: 'center'}
});