import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Link} from 'expo-router';
import {useAuth} from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {register} = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput style={styles.input} placeholder="Ім'я" value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password}
                       onChangeText={setPassword}/>
            <TextInput style={styles.input} placeholder="Підтвердження паролю" secureTextEntry value={confirmPassword}
                       onChangeText={setConfirmPassword}/>

            <Button
                title="Зареєструватися"
                onPress={() => register(email, password, name)}
            />

            <Link href="/login" style={styles.link}>
                Вже є акаунт? Увійти
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