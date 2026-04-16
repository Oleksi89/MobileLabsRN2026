import {Stack, Redirect} from 'expo-router';
import {useAuth} from '../../context/AuthContext';

export default function AuthLayout() {
    const {isAuthenticated} = useAuth();

    // Якщо користувач вже авторизований, відправляємо його в основний додаток
    if (isAuthenticated) {
        return <Redirect href="/(app)"/>;
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="login"/>
            <Stack.Screen name="register"/>
        </Stack>
    );
}