import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export default function StorageStats() {
    const [stats, setStats] = useState({free: 0, total: 0, used: 0});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const free = await FileSystem.getFreeDiskStorageAsync();
                const total = await FileSystem.getTotalDiskCapacityAsync();
                setStats({free, total, used: total - free});
            } catch (error) {
                console.error("Помилка отримання статистики", error);
            }
        };
        fetchStats();
    }, []);

    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Пам'ять:
                Зайнято {formatBytes(stats.used)} з {formatBytes(stats.total)}</Text>
            <Text style={styles.statsText}>Вільно: {formatBytes(stats.free)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statsContainer: {backgroundColor: '#e9ecef', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'},
    statsText: {fontSize: 14, color: '#495057', textAlign: 'center'}
});