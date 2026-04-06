import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export default function FileDetailScreen({route, navigation}) {
    const {uri, name} = route.params;
    const [content, setContent] = useState('');
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        fetchFileDetails();
    }, []);

    const fetchFileDetails = async () => {
        try {
            const info = await FileSystem.getInfoAsync(uri);
            let fileContent = '';

            if (name.endsWith('.txt')) {
                fileContent = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.UTF8});
            }

            setDetails({
                size: info.size,
                modificationTime: new Date(info.modificationTime * 1000).toLocaleString('uk-UA'),
                extension: name.includes('.') ? name.split('.').pop() : 'Невідомо'
            });
            setContent(fileContent);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося завантажити інформацію про файл');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(uri, content, {encoding: FileSystem.EncodingType.UTF8});
            Alert.alert('Успіх', 'Зміни збережено');
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося зберегти файл');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#007BFF" style={styles.loader}/>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Атрибути файлу:</Text>
                <Text style={styles.infoText}><Text style={styles.bold}>Назва:</Text> {name}</Text>
                <Text style={styles.infoText}><Text style={styles.bold}>Тип:</Text> .{details?.extension}</Text>
                <Text style={styles.infoText}><Text style={styles.bold}>Розмір:</Text> {details?.size} байт</Text>
                <Text style={styles.infoText}><Text style={styles.bold}>Змінено:</Text> {details?.modificationTime}
                </Text>
            </View>

            {name.endsWith('.txt') ? (
                <>
                    <Text style={styles.sectionTitle}>Вміст файлу:</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        value={content}
                        onChangeText={setContent}
                    />
                    <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                        <Text style={styles.btnText}>Зберегти зміни</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.unsupportedText}>Редагування недоступне для цього типу файлу.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#f5f5f5', padding: 15},
    loader: {flex: 1, justifyContent: 'center'},
    infoCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5
    },
    infoText: {fontSize: 16, marginBottom: 5, color: '#333'},
    bold: {fontWeight: '600'},
    sectionTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#555'},
    textArea: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        minHeight: 250,
        textAlignVertical: 'top',
        marginBottom: 20
    },
    unsupportedText: {textAlign: 'center', color: '#888', marginTop: 20},
    btnSave: {backgroundColor: '#28a745', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 30},
    btnText: {color: '#fff', fontWeight: 'bold', fontSize: 16}
});