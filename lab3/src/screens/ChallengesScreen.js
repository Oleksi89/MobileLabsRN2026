import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const TaskItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.completed ? props.theme.success + '20' : props.theme.card};
  padding: 15px;
  margin: 8px 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.completed ? props.theme.success : props.theme.border};
`;

const TaskInfo = styled.View`
  flex: 1;
`;

const TaskTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const TaskProgress = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-top: 4px;
`;

export default function ChallengesScreen() {
    const { tasks } = useContext(GameContext);

    const renderItem = ({ item }) => (
        <TaskItem completed={item.completed}>
            <TaskInfo>
                <TaskTitle>{item.title}</TaskTitle>
                <TaskProgress>
                    Прогрес: {item.current} / {item.target}
                </TaskProgress>
            </TaskInfo>
            <MaterialCommunityIcons
                name={item.completed ? "check-circle" : "circle-outline"}
                size={24}
                color={item.completed ? "#22c55e" : "#adb5bd"}
            />
        </TaskItem>
    );

    return (
        <Container>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </Container>
    );
}