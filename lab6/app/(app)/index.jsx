import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Link} from 'expo-router';
import {PRODUCTS} from '../../data/products';
import {useAuth} from '../../context/AuthContext';

export default function CatalogScreen() {
    const { logout, user } = useAuth();

    const renderItem = ({item}) => (
        <Link
            href={{
                pathname: "/details/[id]",
                params: {id: item.id}
            }}
            asChild
        >
            <TouchableOpacity style={styles.card}>
                <Image source={{uri: item.imageUrl}} style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price.toLocaleString()} грн</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.profileText}>Логін: {user?.email || 'Завантаження...'}</Text>
                <Text style={styles.profileSubText}>ID: {user?.uid || '---'}</Text>
            </View>

            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <View style={styles.footer}>
                <Button title="Вийти з акаунту" color="red" onPress={logout}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#f5f5f5'},
    profileHeader: { backgroundColor: '#007AFF', padding: 15, alignItems: 'center' },
    list: {padding: 15},
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    image: {width: 80, height: 80, borderRadius: 5},
    info: {flex: 1, marginLeft: 15, justifyContent: 'center'},
    title: {fontSize: 16, fontWeight: 'bold'},
    price: {fontSize: 14, color: '#888', marginTop: 5},
    footer: {padding: 20, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff'}
});