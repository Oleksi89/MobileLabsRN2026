import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { CONTACTS_DATA } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function ContactsScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Ionicons name="person-circle-outline" size={40} color="#555" />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
            </View>
        </View>
    );

    return (
        <SectionList
            sections={CONTACTS_DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 16, backgroundColor: '#f5f5f5', flexGrow: 1 },
    sectionHeader: { fontSize: 20, fontWeight: 'bold', backgroundColor: '#e0e0e0', paddingVertical: 8, paddingHorizontal: 12, marginTop: 16, borderRadius: 6 },
    itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 8 },
    textContainer: { marginLeft: 12 },
    name: { fontSize: 16, fontWeight: '600' },
    role: { fontSize: 14, color: '#777', marginTop: 2 },
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 4 }
});