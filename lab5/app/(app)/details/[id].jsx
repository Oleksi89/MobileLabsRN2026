import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {PRODUCTS} from '../../../data/products';

export default function ProductDetailsScreen() {
    const {id} = useLocalSearchParams();
    const router = useRouter();

    // product by id
    const product = PRODUCTS.find((p) => p.id === String(id));

    // id is not in the db
    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Товар не знайдено</Text>
                <Button title="Повернутися до каталогу" onPress={() => router.back()}/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: product.imageUrl}} style={styles.image}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price.toLocaleString()} грн</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Назад" onPress={() => router.back()}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'},
    image: {width: '100%', height: 300, resizeMode: 'cover'},
    infoContainer: {padding: 20},
    title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
    price: {fontSize: 20, color: '#007AFF', fontWeight: '600', marginBottom: 15},
    description: {fontSize: 16, color: '#333', lineHeight: 24},
    buttonContainer: {padding: 20, marginTop: 'auto'},
    errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20},
    errorText: {fontSize: 18, marginBottom: 20, color: 'red'}
});