import React, {useContext} from 'react';
import {Switch} from 'react-native';
import styled from 'styled-components/native';
import {ThemeContext} from '../context/ThemeContext';
import {MaterialCommunityIcons} from "@expo/vector-icons";

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.background};
    padding: 20px;
`;

const SettingHeader = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const HeaderText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.textSecondary};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-left: 5px;
`;

const SettingRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.card};
    padding: 15px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.border};
`;

const SettingLabel = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.text};
`;

export default function SettingsScreen() {
    const {isDarkTheme, toggleTheme} = useContext(ThemeContext);

    return (
        <Container>
            <SettingHeader>
                <MaterialCommunityIcons name="palette-outline" size={18} color={isDarkTheme ? '#38bdf8' : '#6c757d'} />
                <HeaderText>Інтерфейс</HeaderText>
            </SettingHeader>
            <SettingRow>
                <SettingLabel>Темна тема</SettingLabel>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                    trackColor={{false: '#767577', true: '#38bdf8'}}
                    thumbColor={isDarkTheme ? '#ffffff' : '#1e1a1e'}
                />
            </SettingRow>
        </Container>
    );
}