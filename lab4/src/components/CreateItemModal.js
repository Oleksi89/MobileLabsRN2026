import React from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default function CreateItemModal({
                                            visible,
                                            type,
                                            onClose,
                                            onSave,
                                            inputName,
                                            setInputName,
                                            fileContent,
                                            setFileContent
                                        }) {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {type === 'folder' ? 'Нова папка' : 'Новий файл .txt'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Назва"
                        value={inputName}
                        onChangeText={setInputName}
                    />
                    {type === 'file' && (
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Вміст (необов'язково)"
                            value={fileContent}
                            onChangeText={setFileContent}
                            multiline
                        />
                    )}
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                            <Text style={styles.btnText}>Скасувати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={onSave}>
                            <Text style={styles.btnText}>Створити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {flex: 1, justifyContent: 'center', backgroundColor: '#100f0f', padding: 20},
    container: {backgroundColor: '#fff', padding: 20, borderRadius: 10},
    title: {fontSize: 18, fontWeight: 'bold', marginBottom: 15},
    input: {borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16},
    textArea: {height: 100, textAlignVertical: 'top'},
    actions: {flexDirection: 'row', justifyContent: 'flex-end'},
    btn: {paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginLeft: 10},
    btnCancel: {backgroundColor: '#dc3545'},
    btnSave: {backgroundColor: '#28a745'},
    btnText: {color: '#fff', fontWeight: 'bold'}
});