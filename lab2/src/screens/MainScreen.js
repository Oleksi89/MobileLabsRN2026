import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { generateNews } from '../data/mockData';

export default function MainScreen({ navigation }) {
    const [news, setNews] = useState(generateNews(0, 15));
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            setNews(generateNews(0, 15));
            setIsRefreshing(false);
        }, 1500);
    }, []);

    const handleLoadMore = () => {
        if (isLoadingMore) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setNews(prev => [...prev, ...generateNews(prev.length, 10)]);
            setIsLoadingMore(false);
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailsScreen', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={news}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            ListHeaderComponent={<Text style={styles.headerTitle}>Останні новини</Text>}
            ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" style={styles.loader} /> : null}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f5f5f5' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 2 },
    image: { width: 100, height: 100, backgroundColor: '#b14b4b',},
    textContainer: { flex: 1, padding: 12, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    desc: { fontSize: 14, color: '#666' },
    separator: { height: 12 },
    loader: { marginVertical: 16 }
});