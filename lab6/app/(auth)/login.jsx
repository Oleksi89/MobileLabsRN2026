import React, {useState} from 'react';
import {Text, TextInput, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {useAuth} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            router.replace('/(app)');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Вхід</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF"/>
            ) : (
                <Button title="Увійти" onPress={handleLogin}/>
            )}
            <Link href="/register" style={styles.link}>
                Немає акаунту? Зареєструватися
            </Link>
            <Link href="/falselink" style={styles.link}>
                Неіснуюче посилання
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
    input: {borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5},
    link: {marginTop: 15, color: 'blue', textAlign: 'center'},
    errorText: {color: 'red', marginBottom: 15, textAlign: 'center'}
});