import {Stack, Redirect} from 'expo-router';
import {useAuth} from '../../context/AuthContext';
import {ActivityIndicator, View} from 'react-native';

export default function AppLayout() {
    const {isAuthenticated} = useAuth();

    // If not authorized, redirect to login
    if (!isAuthenticated) {
        return <Redirect href="/login"/>;
    }

    // If authorized
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Каталог товарів',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="details/[id]"
                options={{
                    title: 'Деталі товару',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack>
    );
}