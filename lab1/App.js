import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import NewsScreen from './screens/NewsScreen';
import GalleryScreen from './screens/GalleryScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <SafeAreaView style={styles.container}>

            <StatusBar style="dark"/>
            <View style={styles.header}>
                <Image
                    source={{uri: 'https://ztu.edu.ua/img/logo/university-colored.png'}}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerText}>FirstMobileApp</Text>
            </View>

            <NavigationContainer>
                <Tab.Navigator
                    id="MainTabs"
                    screenOptions={{
                        tabBarShowIcon: true,
                        tabBarActiveTintColor: '#007AFF',
                        tabBarInactiveTintColor: 'gray',
                        tabBarIndicatorStyle: {backgroundColor: '#007AFF'},
                        tabBarLabelStyle: {fontSize: 12, textTransform: 'none'},
                    }}
                >
                    <Tab.Screen
                        name="Головна"
                        component={NewsScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
                        }}
                    />
                    <Tab.Screen
                        name="Фотогалерея"
                        component={GalleryScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="images-outline" size={22} color={color} />
                        }}
                    />
                    <Tab.Screen
                        name="Профіль"
                        component={RegistrationScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Васянович Олександр Андрійович, ІПЗ-22-3</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    logo: {width: 150, height: 50},
    headerText: {fontSize: 16, fontWeight: 'bold', marginLeft: 10},
    footer: {
        padding: 10,
        backgroundColor: '#eee',
        alignItems: 'center',
    },
    footerText: {fontSize: 12, color: '#333'}
});