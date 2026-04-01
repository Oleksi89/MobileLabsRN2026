import React from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function RegistrationScreen() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.pageTitle}>Реєстрація</Text>

                <Text style={styles.label}>Електронна пошта</Text>
                <TextInput style={styles.input} />

                <Text style={styles.label}>Пароль</Text>
                <TextInput style={styles.input} secureTextEntry />

                <Text style={styles.label}>Пароль (ще раз)</Text>
                <TextInput style={styles.input} secureTextEntry />

                <Text style={styles.label}>Прізвище</Text>
                <TextInput style={styles.input} />

                <Text style={styles.label}>Ім'я</Text>
                <TextInput style={styles.input} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, color: '#333', marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});