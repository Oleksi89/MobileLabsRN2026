import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="auto"/>
            <AppNavigator/>
        </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
