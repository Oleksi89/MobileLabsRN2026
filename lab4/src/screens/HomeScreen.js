import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { Paths, Directory, File } from 'expo-file-system';
import {Ionicons} from '@expo/vector-icons';
import FileListItem from '../components/FileListItem';
import CreateItemModal from '../components/CreateItemModal';
import StorageStats from "../components/StorageStats";

const ROOT_DIR = Paths.document.uri;

export default function HomeScreen({navigation}) {
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [createType, setCreateType] = useState(null);
    const [inputName, setInputName] = useState('');
    const [fileContent, setFileContent] = useState('');

    const loadDirectory = useCallback(async (pathUri) => {
        setLoading(true);
        try {
            const currentDir = new Directory(pathUri);
            const contents = currentDir.list(); // Синхронно повертає масив об'єктів File та Directory

            const fileInfos = contents.map((item) => {
                const isDirectory = item instanceof Directory;
                return {
                    name: item.name,
                    uri: item.uri,
                    isDirectory
                };
            });

            fileInfos.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });

            setFiles(fileInfos);
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося завантажити директорію");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadDirectory(currentPath);
        });
        return unsubscribe;
    }, [navigation, currentPath, loadDirectory]);

    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath, loadDirectory]);

    const handlePressItem = (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.uri);
        } else {
            navigation.navigate('FileDetail', {uri: item.uri, name: item.name});
        }
    };

    const handleDelete = (item) => {
        Alert.alert(
            'Підтвердження',
            `Ви впевнені, що хочете видалити ${item.isDirectory ? 'папку' : 'файл'} "${item.name}"?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (item.isDirectory) {
                                const dir = new Directory(item.uri);
                                await dir.delete();
                            } else {
                                const file = new File(item.uri);
                                await file.delete();
                            }
                            loadDirectory(currentPath);
                        } catch (error) {
                            Alert.alert('Помилка', 'Не вдалося видалити об\'єкт');
                        }
                    }
                }
            ]
        );
    };

    const goBack = () => {
        if (currentPath === ROOT_DIR) return;

        // Використовуємо властивість parentDirectory нового API замість розрізання строк
        const currentDir = new Directory(currentPath);
        let newPath = currentDir.parentDirectory?.uri || ROOT_DIR;

        if (!newPath.startsWith(ROOT_DIR) || newPath.length < ROOT_DIR.length) {
            newPath = ROOT_DIR;
        }

        setCurrentPath(newPath);
    };

    const handleCreate = async () => {
        if (!inputName.trim()) {
            Alert.alert('Помилка', 'Введіть назву');
            return;
        }

        try {
            const parentDir = new Directory(currentPath);

            if (createType === 'folder') {
                const newDir = new Directory(parentDir, inputName.trim());
                await newDir.create();
            } else if (createType === 'file') {
                const fileName = inputName.trim().endsWith('.txt') ? inputName.trim() : inputName.trim() + '.txt';
                const newFile = new File(parentDir, fileName);
                await newFile.write(fileContent || ''); // Відразу записуємо вміст
            }

            setModalVisible(false);
            loadDirectory(currentPath);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося виконати операцію');
        }
    };

    return (
        <View style={styles.container}>
            <StorageStats />
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} disabled={currentPath === ROOT_DIR}>
                    <Ionicons name="arrow-back" size={24} color={currentPath === ROOT_DIR ? '#ccc' : '#000'}/>
                </TouchableOpacity>
                <Text style={styles.breadcrumb} numberOfLines={1}>
                    {currentPath === ROOT_DIR ? 'Головна' : '...' + currentPath.slice(-20)}
                </Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" style={styles.loader}/>
            ) : (
                <FlatList
                    data={files}
                    keyExtractor={(item) => item.uri}
                    renderItem={({item}) =>
                        <FileListItem item={item}
                        onPress={handlePressItem}
                        onDelete={handleDelete}/>}
                    ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
                />
            )}

            <View style={styles.toolbar}>
                <TouchableOpacity style={styles.toolBtn} onPress={() => {
                    setCreateType('folder');
                    setInputName('');
                    setFileContent('');
                    setModalVisible(true);
                }}>
                    <Ionicons name="folder-open" size={20} color="#fff"/>
                    <Text style={styles.toolBtnText}>Папка</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBtn} onPress={() => {
                    setCreateType('file');
                    setInputName('');
                    setFileContent('');
                    setModalVisible(true);
                }}>
                    <Ionicons name="document-text" size={20} color="#fff"/>
                    <Text style={styles.toolBtnText}>Файл</Text>
                </TouchableOpacity>
            </View>

            <CreateItemModal
                visible={modalVisible}
                type={createType}
                onClose={() => setModalVisible(false)}
                onSave={handleCreate}
                inputName={inputName}
                setInputName={setInputName}
                fileContent={fileContent}
                setFileContent={setFileContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#f5f5f5'},
    statsContainer: {backgroundColor: '#e9ecef', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'},
    statsText: {fontSize: 14, color: '#495057', textAlign: 'center'},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    breadcrumb: {marginLeft: 10, fontSize: 16, flex: 1},
    loader: {flex: 1, justifyContent: 'center'},
    emptyText: {textAlign: 'center', marginTop: 20, color: '#888'},
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    toolBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    toolBtnText: {color: '#fff', marginLeft: 8, fontSize: 16, fontWeight: 'bold'}
});