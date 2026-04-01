import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';

const NEWS_DATA = Array.from({ length: 10 }).map((_, i) => ({
    id: String(i),
    title: 'Заголовок новини',
    date: 'Дата новини',
    text: 'Короткий текст новини'
}));

export default function NewsScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.newsItem}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Новини</Text>
            <FlatList
                data={NEWS_DATA}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    newsItem: { flexDirection: 'row', marginBottom: 20 },
    imagePlaceholder: {
        width: 80, height: 80, backgroundColor: '#a55353',
        justifyContent: 'center', alignItems: 'center', marginRight: 15
    },
    imageIcon: { fontSize: 30, color: '#ccc' },
    textContainer: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: 'bold' },
    date: { fontSize: 12, color: '#999', marginVertical: 4 },
    text: { fontSize: 14, color: '#666' }
});