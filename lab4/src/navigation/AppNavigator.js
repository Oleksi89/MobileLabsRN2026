import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from "@react-navigation/native";

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}