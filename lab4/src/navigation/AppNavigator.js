import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from "@react-navigation/native";
import FileDetailScreen from "../components/FileDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Файловий менеджер'}}
                />
                <Stack.Screen
                    name="FileDetail"
                    component={FileDetailScreen}
                    options={{title: 'Деталі файлу'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}