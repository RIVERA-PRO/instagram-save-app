import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Clipboard } from 'react-native';

export default function CrearCuentaBtn() {
    return (
        <TouchableOpacity style={styles.buton}>
            <Text style={styles.text}>
                Crear cuenta nueva
            </Text>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    text: {
        color: '#2474e1',
        fontSize: 16,
        textAlign: 'center',
    },
    buton: {
        width: '100%',

        borderColor: '#2474e1',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,

        backgroundColor: '#3453',
        color: '#fff',
        justifyContent: 'center',

    }
})