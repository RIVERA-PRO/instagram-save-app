import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButonLogo from './ButonLogo'
import OlvideContraseña from './OlvidaseContraseña'
import Icon from 'react-native-vector-icons/FontAwesome'; // Reemplaza 'FontAwesome' con la fuente de iconos que estés usando

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userRecords, setUserRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // useEffect to retrieve userRecords from AsyncStorage during component mount
    useEffect(() => {
        const retrieveData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                const parsedData = JSON.parse(storedData);
                setUserRecords(parsedData || []);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        retrieveData();
    }, []); // Empty dependency array to run only once on mount

    // useEffect to save userRecords to AsyncStorage whenever it changes
    useEffect(() => {
        AsyncStorage.setItem('userData', JSON.stringify(userRecords));
    }, [userRecords]);

    const handleSignup = async () => {
        setIsLoading(true);

        const userData = {
            mail: email,
            password: password,
        };

        const url = 'https://count-save.onrender.com/users/signup';

        try {
            await axios.post(url, userData);

            const newRecord = { ...userData };
            setUserRecords(prevRecords => [...prevRecords, newRecord]);
            setSuccessModalVisible(true);
            setIsLoading(false);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error creating user:', error);

            let errorMessage = 'Se produjo un error al procesar la solicitud.';
            if (error.response && error.response.data && error.response.data.message) {
                if (typeof error.response.data.message === 'string') {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = error.response.data.message.join(' ');
                }
            }

            console.log(errorMessage);

            setErrorMessage(errorMessage);
            setErrorModalVisible(true);
            setIsLoading(false); // Hide loading indicator on error
        }
    };

    return (
        <View style={styles.container}>
            <ButonLogo />

            <TextInput
                style={styles.input}
                placeholder="Celular o correo electronico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                value={password}
                secureTextEntry={!showPassword} // Use secureTextEntry={!showPassword}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={23}
                    color="#888"
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Inciar Sesión</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
            <OlvideContraseña />
            {/* Success Modal */}
            <Modal visible={successModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalError}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorTitle}>Se produjo un error</Text>
                        <Text style={styles.errorText}>Vuelve a intentarlo</Text>
                        <TouchableOpacity onPress={() => setSuccessModalVisible(false)} style={styles.okButton}>
                            <Text style={styles.okButtonText}>Aceptar</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Error Modal */}
            <Modal visible={errorModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalError}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorTitle}>Se produjo un error</Text>
                        <Text style={styles.errorText}>{errorMessage}</Text>

                        <TouchableOpacity onPress={() => setErrorModalVisible(false)} style={styles.okButton}>
                            <Text style={styles.okButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 20,
        padding: 20,

    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#3453',
        color: '#fff'
    },
    button: {
        backgroundColor: '#2474e1',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '100%',
        textAlign: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    modalError: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#333',
        width: 260,
        height: 170,
        borderRadius: 3,
        padding: 20,
        zIndex: 3
    },
    okButtonText: {
        color: '#2474e1',
        fontSize: 16,
    },
    errorText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 10,
    },
    errorTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    okButton: {


        borderRadius: 5,
        justifyContent: 'flex-end',
        marginLeft: '70%',
        paddingTop: 30
    },
    loader: {
        marginHorizontal: 20,
        height: 10,
        backgroundColor: '#2474e1',
        top: 246,
        zIndex: 2,
        position: 'absolute',
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30
    },
    toggleButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: 180,
        left: '89%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    toggleButtonText: {
        color: '#888',

    },


});
