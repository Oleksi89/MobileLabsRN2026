import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function FileListItem({ item, onPress, onDelete }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.itemContent} onPress={() => onPress(item)}>
                <Ionicons
                    name={item.isDirectory ? 'folder' : 'document-text'}
                    size={24}
                    color={item.isDirectory ? '#FFD700' : '#87CEFA'}
                />
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)}>
                <Ionicons name="trash-outline" size={24} color="#dc3545" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 5
    },
    name: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
        flex: 1
    },
    deleteBtn: {
        padding: 10
    }
});