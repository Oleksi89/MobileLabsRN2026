import React, {useContext, useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS
} from 'react-native-reanimated';
import {GameContext} from '../context/GameContext';

const {width, height} = Dimensions.get('window');
const LIMIT_X = width / 2 - 40;
const LIMIT_Y = height / 2 - 150;

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.background};
    align-items: center;
    justify-content: center;
`;

const ScoreLabel = styled.Text`
    font-size: 24px;
    color: ${props => props.theme.textSecondary};
    margin-bottom: 5px;
`;

const ScoreValue = styled.Text`
    font-size: 64px;
    font-weight: bold;
    color: ${props => props.theme.primary};
    margin-bottom: 50px;
`;

const ClickerObject = styled(Animated.View)`
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: ${props => props.theme.primary};
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-width: 4px;
    border-color: #6e6e6e;
    elevation: 15;
    shadow-color: ${props => props.theme.primary};
    shadow-offset: 0px 10px;
    shadow-opacity: 0.5;
    shadow-radius: 15px;
`;

const ClickerText = styled.Text`
    color: white;
    font-weight: 900;
    font-size: 14px;
    margin-top: 5px;
`;

const LegendContainer = styled.View`
    background-color: ${props => props.theme.card};
    padding: 20px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    width: 100%;
    border-top-width: 1px;
    border-color: ${props => props.theme.border};
    position: absolute;
    bottom: 0;
    z-index: 1;
`;

const LegendItem = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const LegendText = styled.Text`
    color: ${props => props.theme.text};
    font-size: 20px;
    margin-left: 10px;
    flex: 1;
`;

const Points = styled.Text`
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 20px;
`;


export default function HomeScreen() {
    const {score, addScore, updateTask} = useContext(GameContext);

    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    // 1. Одинарний тап
    const tapGesture = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            runOnJS(addScore)(1);
            runOnJS(updateTask)('tap10');
            scale.value = withSpring(1.2, {}, () => {
                scale.value = withSpring(1);
            });
        });

    // 2. Подвійний тап
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            runOnJS(addScore)(2);
            runOnJS(updateTask)('doubleTap5');
            scale.value = withSpring(1.4, {}, () => {
                scale.value = withSpring(1);
            });
        });

    // Довге натискання (3 секунди)
    const longPressGesture = Gesture.LongPress()
        .minDuration(3000)
        .onEnd((event, success) => {
            if (success) {
                runOnJS(addScore)(5);
                runOnJS(updateTask)('longPress3s');
            }
        });

    // Перетягування (Pan)
    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            const nextX = e.translationX + savedTranslateX.value;
            const nextY = e.translationY + savedTranslateY.value;

            translateX.value = Math.max(-LIMIT_X, Math.min(LIMIT_X, nextX));
            translateY.value = Math.max(-LIMIT_Y, Math.min(LIMIT_Y, nextY));

        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
            runOnJS(updateTask)('drag');
        });

    // Свайпи (Fling)
    const flingRight = Gesture.Fling()
        .direction(1) // Right
        .onStart(() => {
            runOnJS(addScore)(Math.floor(Math.random() * 10) + 1);
            runOnJS(updateTask)('swipeRight');
        });

    const flingLeft = Gesture.Fling()
        .direction(2) // Left
        .onStart(() => {
            runOnJS(addScore)(Math.floor(Math.random() * 10) + 1);
            runOnJS(updateTask)('swipeLeft');
        });

    // Масштабування (Pinch)
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
            runOnJS(updateTask)('resize');
            runOnJS(updateTask)('customTask');
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
            {scale: scale.value},
        ],
    }));

    // Об'єднання жестів
    const composedGestures = Gesture.Exclusive(
        doubleTapGesture,
        // що можуть працювати разом
        Gesture.Simultaneous(
            tapGesture,
            longPressGesture,
            panGesture,
            pinchGesture,
            flingRight,
            flingLeft
        )
    );

    return (
        <Container>
            <ScoreLabel>SCORE</ScoreLabel>
            <ScoreValue>{score}</ScoreValue>

            <GestureDetector gesture={composedGestures}>
                <ClickerObject style={animatedStyle}>
                    <MaterialCommunityIcons name="gesture-tap" size={50} color="white"/>
                    <ClickerText>Tap / Pull</ClickerText>
                </ClickerObject>
            </GestureDetector>

            <LegendContainer>
                <LegendItem>
                    <MaterialCommunityIcons name="gesture-tap" size={18} color="#0ea5e9"/>
                    <LegendText>Tap</LegendText>
                    <Points>+1</Points>
                </LegendItem>
                <LegendItem>
                    <MaterialCommunityIcons name="gesture-double-tap" size={18} color="#0ea5e9"/>
                    <LegendText>Double Tap</LegendText>
                    <Points>+2</Points>
                </LegendItem>
                <LegendItem>
                    <MaterialCommunityIcons name="timer-sand" size={18} color="#0ea5e9"/>
                    <LegendText>Long Press (3s)</LegendText>
                    <Points>+5</Points>
                </LegendItem>
                <LegendItem>
                    <MaterialCommunityIcons name="gesture-swipe" size={18} color="#0ea5e9"/>
                    <LegendText>Swipe</LegendText>
                    <Points>1-10</Points>
                </LegendItem>
            </LegendContainer>
        </Container>
    );
}