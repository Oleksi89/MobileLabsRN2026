import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, Stack} from 'expo-router';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Помилка 404'}}/>
            <View style={styles.container}>
                <Text style={styles.title}>Екран не знайдено</Text>
                <Link href="/" style={styles.link}>
                    Повернутися на головну сторінку
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff'},
    title: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
    link: {fontSize: 16, color: '#007AFF', padding: 10}
});