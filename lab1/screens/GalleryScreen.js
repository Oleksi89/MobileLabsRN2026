import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const GALLERY_DATA = Array.from({ length: 12 }).map((_, i) => ({ id: String(i) }));

export default function GalleryScreen() {
    const renderItem = () => (
        <View style={styles.imageCard} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={GALLERY_DATA}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    row: { justifyContent: 'space-between' },
    imageCard: {
        width: '48%',
        height: 120,
        backgroundColor: '#954141',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 15,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 }
    }
});