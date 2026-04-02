import React, { useContext } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '../context/ThemeContext';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 20px;
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
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <Container>
            <SettingRow>
                <SettingLabel>Темна тема</SettingLabel>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: '#38bdf8' }}
                    thumbColor={isDarkTheme ? '#ffffff' : '#f4f3f4'}
                />
            </SettingRow>
        </Container>
    );
}