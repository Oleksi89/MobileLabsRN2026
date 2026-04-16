import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {doc, getDoc, setDoc} from 'firebase/firestore'; // Замінили updateDoc на setDoc
import {db} from '../../config/firebase';
import {useAuth} from '../../context/AuthContext';

export default function ProfileScreen() {
    const {user} = useAuth();
    const [profileData, setProfileData] = useState({name: '', age: '', city: ''});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Завантаження даних з Firestore
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Явно розбираємо DocumentData, щоб IDE не сварилася
                    setProfileData({
                        name: data.name || '',
                        age: data.age || '',
                        city: data.city || ''
                    });
                }
            } catch (error) {
                console.error("Fetch profile error:", error);
                Alert.alert('Помилка', 'Не вдалося завантажити профіль. Перевірте правила бази даних.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    // Збереження / Оновлення даних у Firestore
    const handleUpdate = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const docRef = doc(db, 'users', user.uid);
            // Використовуємо setDoc з merge: true. Це вирішує проблему "документ не знайдено"
            await setDoc(docRef, {
                name: profileData.name,
                age: profileData.age,
                city: profileData.city
            }, {merge: true});

            Alert.alert('Успіх', 'Дані профілю успішно збережено');
        } catch (error) {
            Alert.alert('Помилка', error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#007AFF" style={styles.loader}/>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ім`я:</Text>
            <TextInput
                style={styles.input}
                value={profileData.name}
                onChangeText={(text) => setProfileData({...profileData, name: text})}
                placeholder="Введіть ваше ім'я"
            />

            <Text style={styles.label}>Вік:</Text>
            <TextInput
                style={styles.input}
                value={profileData.age}
                onChangeText={(text) => setProfileData({...profileData, age: text})}
                placeholder="Введіть ваш вік"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Місто:</Text>
            <TextInput
                style={styles.input}
                value={profileData.city}
                onChangeText={(text) => setProfileData({...profileData, city: text})}
                placeholder="Введіть ваше місто"
            />

            {saving ? (
                <ActivityIndicator size="small" color="#007AFF"/>
            ) : (
                <Button title="Зберегти зміни" onPress={handleUpdate}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: '#fff'},
    loader: {flex: 1, justifyContent: 'center'},
    label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333'},
    input: {borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 20, borderRadius: 8}
});