import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import HomeScreen from '../screens/HomeScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { isDarkTheme } = useContext(ThemeContext);
    const themeColors = useTheme();

    const navigationTheme = isDarkTheme ? NavDarkTheme : DefaultTheme;
    const customNavTheme = {
        ...navigationTheme,
        colors: {
            ...navigationTheme.colors,
            background: themeColors.background,
            card: themeColors.card,
            text: themeColors.text,
            border: themeColors.border,
        },
    };

    return (
        <NavigationContainer theme={customNavTheme}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: themeColors.primary,
                    tabBarInactiveTintColor: themeColors.textSecondary,
                    headerStyle: { backgroundColor: themeColors.card },
                    headerTitleStyle: { color: themeColors.text },
                    tabBarStyle: { backgroundColor: themeColors.card, borderTopColor: themeColors.border },
                })}>
                <Tab.Screen
                    name="Гра"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="play-circle" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Завдання"
                    component={ChallengesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="format-list-checks" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Налаштування"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}