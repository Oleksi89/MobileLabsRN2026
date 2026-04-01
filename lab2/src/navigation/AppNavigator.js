import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const NewsStack = ({navigation}) => (
    <Stack.Navigator id="NewsStack">
        <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
                title: 'Стрічка новин',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginLeft: 16, marginRight: 16}}>
                        <Ionicons name="menu" size={28} color="black"/>
                    </TouchableOpacity>
                )
            }}
        />
        <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={({route}) => ({
                title: route.params?.item?.title || 'Деталі'
            })}
        />
    </Stack.Navigator>
);

export default function AppNavigator() {
    return (
        <Drawer.Navigator id="MainDrawer">
            <Drawer.Screen
                name="NewsDrawer"
                component={NewsStack}
                options={{title: 'Новини', headerShown: false,
                    drawerIcon: ({color}) => <Ionicons name="newspaper-outline" size={22} color={color}/>}}
            />
            <Drawer.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{
                    title: 'Контакти',
                    drawerIcon: ({color}) => <Ionicons name="people-outline" size={22} color={color}/>
                }}
            />
        </Drawer.Navigator>
    );
}