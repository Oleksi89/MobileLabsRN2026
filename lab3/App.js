import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CustomThemeProvider} from './src/context/ThemeContext';
import {GameProvider} from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="auto"/>
            <CustomThemeProvider>
                <GameProvider>
                    <AppNavigator/>
                </GameProvider>
            </CustomThemeProvider>
        </GestureHandlerRootView>
    );
}