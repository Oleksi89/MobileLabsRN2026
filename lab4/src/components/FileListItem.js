import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function FileListItem({item, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
            <Ionicons
                name={item.isDirectory ? 'folder' : 'document-text'}
                size={24}
                color={item.isDirectory ? '#FFD700' : '#87CEFA'}
            />
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    name: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
});