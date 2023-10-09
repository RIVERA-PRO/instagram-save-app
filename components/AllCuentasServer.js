import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Clipboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AllCuentasServer() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setTimeout(() => {
            fetch('https://count-save.onrender.com/users')
                .then(response => response.json())
                .then(data => {

                    setUsers(data.users.reverse());
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener los usuarios:', error);
                    setLoading(false);
                    showErrorAlert();
                });
        }, 2000); // Simular tiempo de carga de 2 segundos
    };


    const showErrorAlert = () => {
        Alert.alert(
            '¡Ops!',
            'Ha ocurrido un error en la petición',
            [
                {
                    text: 'Aceptar',
                    onPress: () => console.log('Error alert closed'),
                },
            ],
            { cancelable: false }
        );
    };
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        return `${day} ${month} ${year} ${formattedTime}`;
    };
    const copyToClipboard = (text) => {
        Clipboard.setString(text);

    };

    return (
        <View style={styles.container}>

            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#E1306C" />
            ) : (
                <ScrollView>
                    <Text style={styles.title}>{users.length} Usuarios registrados</Text>
                    {users.map((user, index) => (
                        <View key={index} style={styles.userContainer}>
                            <View style={styles.deFlex}>
                                <Text style={styles.textColorTitle}>Email:  <Text style={styles.textColor}>{user.mail}</Text></Text>
                                <TouchableOpacity onPress={() => copyToClipboard(user.mail)}>
                                    <AntDesign name="copy1" size={18} color='#E1306C' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.deFlex}>
                                <Text style={styles.textColorTitle}>Contraseña: <Text style={styles.textColor}>{user.password}</Text></Text>
                                <TouchableOpacity onPress={() => copyToClipboard(user.password)}>
                                    <AntDesign name="copy1" size={18} color='#E1306C' />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.date}>{formatDateTime(user.createdAt)}</Text>
                        </View>
                    ))}

                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20

    },
    loader: {
        marginTop: 20,
    },
    userContainer: {
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        padding: 10,
        margin: 10,

        borderRadius: 10,
        flexDirection: 'column',
        gap: 7

    },
    title: {
        textAlign: 'center',
        fontSize: 17
    },
    copyButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    deFlex: {
        flexDirection: 'row',

        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textColor: {
        color: '#E1306C',
        fontSize: 14
    },
    textColorTitle: {
        color: 'rgba(0, 0, 0,0.6)',
        fontSize: 13
    },
    date: {
        fontSize: 12,
        color: 'rgba(0, 0, 0,0.6)',
    }

});
