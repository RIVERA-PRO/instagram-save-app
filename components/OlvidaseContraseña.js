import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator, Alert, StyleSheet, ImageBackground } from 'react-native';
import fondo from '../assets/fondo7.png'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Spiral from './Spiral';
export default function OlvidaseContraseña() {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorDialogVisible, setErrorDialogVisible] = useState(false);

    const handleSendEmail = () => {
        if (email === email) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)

            }, 2000);
            setTimeout(() => {

                setErrorDialogVisible(true);
            }, 2000);

            return;
        }




        // Reset email and close modal
        setEmail('');
        setModalVisible(false);
    };

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <ImageBackground source={fondo} style={styles.contenedor}>
                    <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Recupera tu contraseña</Text>
                    <Text style={styles.text}>Ingresa tu número de celular o correo</Text>

                    <View style={styles.modalContent}>

                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            handleSendEmail();
                            setIsLoading(true); // Add this line
                        }} >
                            <Text style={styles.buttonText}>Buscar cuenta</Text>
                        </TouchableOpacity>

                    </View>

                </ImageBackground>
            </Modal>





            <Modal
                visible={isLoading}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalSpiral}>
                    {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
                </View>


            </Modal>


            <Modal
                visible={errorDialogVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainerError}>
                    <View style={styles.modalError}>
                        <Text style={styles.errorTitle}>Se produjo un error</Text>
                        <Text style={styles.errorText}>Vuelve a intentarlo</Text>
                        <TouchableOpacity style={styles.okButton} onPress={() => {
                            setErrorDialogVisible(false);
                            setIsLoading(false); // Add this line
                        }}>
                            <Text style={styles.okButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        height: '100%',
        padding: 20,

    },
    container: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContainerError: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    input: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#3453',
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
    modalClose: {

    },

    loadingContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
    okButtonText: {
        color: '#2474e1',
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: 20
    },
    text: {
        fontSize: 14,
        color: '#fff',
        paddingTop: 10
    },
    modalContent: {
        paddingTop: 20
    },
    modalError: {
        backgroundColor: '#333',
        width: 260,
        height: 150,
        borderRadius: 3,
        padding: 20,
        zIndex: 3
    },
    spiralmodal: {
        height: 20
    },
    modalSpiral: {
        backgroundColor: '#fff',
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: '#2474e1',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',

        marginHorizontal: 40,
        top: 225,
        zIndex: 2,
        position: 'absolute',
        right: 0,
        left: 0
    }
});
