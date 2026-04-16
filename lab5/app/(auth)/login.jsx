import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Link, router} from 'expo-router';
import {useAuth} from '../../context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

    const handleLogin = () => {
        login(email, password);
        // Force redirection for instant response
        router.replace('/(app)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Вхід</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Увійти" onPress={handleLogin}/>
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
    link: {marginTop: 15, color: 'blue', textAlign: 'center'}
});