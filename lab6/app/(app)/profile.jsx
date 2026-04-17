import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {doc, getDoc, setDoc} from 'firebase/firestore'; // Замінили updateDoc на setDoc
import {db} from '../../config/firebase';
import {useAuth} from '../../context/AuthContext';
import {deleteDoc} from 'firebase/firestore';
import {Link} from "expo-router";

export default function ProfileScreen() {
    const {user, deleteAccount, validateAccess, updateUserProfile} = useAuth();
    const [profileData, setProfileData] = useState({name: '', age: '', city: ''});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [password, setPassword] = useState('');
    const [deleting, setDeleting] = useState(false);

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
            await updateUserProfile(user.uid, {
                name: profileData.name,
                age: profileData.age,
                city: profileData.city
            });

            Alert.alert('Успіх', 'Дані профілю успішно збережено');
        } catch (error) {
            Alert.alert('Помилка', error.message);
        } finally {
            setSaving(false);
        }
    };


    const handleDeleteAccount = async () => {
        if (!password) {
            Alert.alert('Помилка', 'Для видалення акаунту необхідно ввести поточний пароль');
            return;
        }

        Alert.alert(
            'Видалення акаунту',
            'Ви впевнені? Цю дію неможливо скасувати.',
            [
                {text: 'Скасувати', style: 'cancel'},
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        setDeleting(true);
                        try {
                            await deleteAccount(password);
                        } catch (error) {
                            Alert.alert('Помилка видалення', 'Перевірте правильність паролю або спробуйте пізніше.');
                            setDeleting(false);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#007AFF" style={styles.loader}/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.profileText}>Логін: {user?.email || 'Завантаження...'}</Text>
                <Text style={styles.profileSubText}>ID: {user?.uid || '---'}</Text>
            </View>

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
            <View style={styles.deleteSection}>
                <Text style={styles.deleteTitle}>Небезпечна зона</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Введіть пароль для видалення"
                    secureTextEntry
                />
                {deleting ? (
                    <ActivityIndicator size="small" color="red"/>
                ) : (
                    <Button title="Видалити акаунт" color="red" onPress={handleDeleteAccount}/>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: '#fff'},
    profileHeader: { backgroundColor: '#007AFF',marginBottom: 25, padding: 15, alignItems: 'center' },
    profileText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    profileSubText: { color: '#e0e0e0', fontSize: 12, marginTop: 4 },
    deleteSection: {marginTop: 40, paddingTop: 20, borderTopWidth: 1, borderColor: '#eee'},
    deleteTitle: {fontSize: 18, fontWeight: 'bold', color: 'red', marginBottom: 15},
    loader: {flex: 1, justifyContent: 'center'},
    label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333'},
    input: {borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 20, borderRadius: 8}
});