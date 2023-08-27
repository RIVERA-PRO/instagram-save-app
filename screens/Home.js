import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import fondo from '../assets/fondo7.png'
import { FontAwesome } from '@expo/vector-icons';
import ButonLogo from '../components/ButonLogo';
import { MaterialIcons } from '@expo/vector-icons';
import Login from '../components/Login';
import OlvidaseContraseña from '../components/OlvidaseContraseña';
import Meta from '../components/Meta';
import Idiomas from '../components/Idiomas';
const windowWidth = Dimensions.get('window').width;

export default function Home() {
    const navigation = useNavigation();


    return (
        <ImageBackground source={fondo} style={styles.contenedor}>
            <Idiomas />


            <Login />


            <Meta />
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    contenedor: {

        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

});
