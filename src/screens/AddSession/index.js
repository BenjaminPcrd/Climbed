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

import { translate } from '../../translations'

const AddSession = () => {
    const [date, setDate] = useState(new Date())
    const [location, setLocation] = useState('')
    const [type, setType] = useState('INDOOR')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowDatePicker(Platform.OS === 'ios')
        setDate(currentDate)
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
                <Button title={translate('addSession')} color='darkblue'/>
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