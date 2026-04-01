import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://ui-avatars.com/api/?name=Oleksandr+V&background=a0a0a0&color=fff' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Олександр Васянович</Text>
                <Text style={styles.group}>Група: ІПЗ-22-3</Text>
            </View>
            <View style={styles.menuContainer}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center', backgroundColor: '#f9f9f9' },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
    name: { fontSize: 18, fontWeight: 'bold' },
    group: { fontSize: 14, color: '#666', marginTop: 4 },
    menuContainer: { flex: 1, paddingTop: 10 }
});