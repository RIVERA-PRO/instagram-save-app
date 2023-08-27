import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Idiomas() {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <View style={styles.container}>

            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => handleLanguageChange(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Español" value="es" color="gray" />
                <Picker.Item label="Español" value="es" color="gray" />
                <Picker.Item label="English" value="en" color="gray" />
                <Picker.Item label="Français" value="fr" color="gray" />

            </Picker>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 100
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    picker: {
        width: 200,
        color: 'gray',
        textAlign: 'center',

        marginLeft: '30%'

    },


});
