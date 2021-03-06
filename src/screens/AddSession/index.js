import React, { useState } from 'react'

import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Keyboard
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { translate } from '../../translations'

const AddSession = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [location, setLocation] = useState('')
    const [type, setType] = useState('INDOOR')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowDatePicker(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const onSubmit = async () => {
        const sessionToAdd = { 
            id: Math.random().toString(36).substr(2, 5),
            date: date.toISOString().split('T')[0], 
            location, 
            type, 
            climbs: [] 
        }

        try {
            const jsonSessions = await AsyncStorage.getItem('@sessions')
            let newSessions
            if(jsonSessions != null) {
                const sessions = JSON.parse(jsonSessions)
                newSessions = [sessionToAdd, ...sessions]
            } else {
                newSessions = [sessionToAdd]
            }
            //await AsyncStorage.removeItem('@sessions')
            //console.log(newSessions)
            await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
            navigation.navigate('Session', { session: sessionToAdd, title: `${sessionToAdd.location} - ${new Date(sessionToAdd.date).toLocaleDateString()}` })
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <View>
            <View style={styles.input}>
                <Text style={styles.label}>{translate('date')}</Text>
                <TextInput value={date.toDateString()} onTouchStart={() => setShowDatePicker(true)} onTouchEnd={() => Keyboard.dismiss()} underlineColorAndroid='darkblue'/>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        onChange={onDateChange}
                    />
                )}
            </View>
            <View style={styles.input}>
                <Text style={styles.label}>{translate('location')}</Text>
                <TextInput value={location} onChangeText={setLocation} underlineColorAndroid='darkblue'/>
            </View>
            <View style={styles.input}>
                <Text style={styles.label}>{translate('type')}</Text>
                <Picker selectedValue={type} onValueChange={setType} mode='dropdown'>
                    <Picker.Item label={translate('indoorSession')} value="INDOOR" />
                    <Picker.Item label={translate('outdoorSession')} value="OUTDOOR" />
                </Picker>
            </View>
            <View style={styles.input}>
                <Button title={translate('addSession')} color='darkblue' onPress={onSubmit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 10
    },
    label: {
        color: 'grey'
    }
})

export default AddSession