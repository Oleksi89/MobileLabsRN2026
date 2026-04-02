import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {GameContext} from '../context/GameContext';

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

const taskIcons = {
    tap10: 'fingerprint',
    doubleTap5: 'gesture-double-tap',
    longPress3s: 'clock-fast',
    drag: 'hand-grabbing',
    swipeRight: 'arrow-right-bold-circle-outline',
    swipeLeft: 'arrow-left-bold-circle-outline',
    resize: 'arrow-expand-all',
    score100: 'trophy-outline',
    customTask: 'star-circle-outline'
};

const IconWrapper = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => props.theme.primary + '20'};
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export default function ChallengesScreen() {
    const {tasks} = useContext(GameContext);

    const renderItem = ({item}) => (
        <TaskItem completed={item.completed}>
            <IconWrapper>
                <MaterialCommunityIcons
                    name={taskIcons[item.id] || 'checkbox-blank-circle-outline'}
                    size={22}
                    color={item.completed ? "#22c55e" : "#0ea5e9"}
                />
            </IconWrapper>
            <TaskInfo>
                <TaskTitle>{item.title}</TaskTitle>
                <TaskProgress completed={item.completed}>
                    {item.completed ? 'Виконано!' : `Прогрес: ${item.current} / ${item.target}`}
                </TaskProgress>
            </TaskInfo>
            {item.completed && <MaterialCommunityIcons name="check-decagram" size={24} color="#22c55e" />}
        </TaskItem>
    );

    return (
        <Container>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{paddingVertical: 10}}
            />
        </Container>
    );
}