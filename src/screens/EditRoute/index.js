import React, { useState } from 'react'

import {
    View,
    ScrollView,
    Text,
    Button,
    Switch,
    TextInput,
    StyleSheet,
    Keyboard
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'

import { freeClimbingGrades, boulderingGrades } from '../../assets/grades'

import AsyncStorage from '@react-native-async-storage/async-storage'

const EditRoute = ({ navigation }) => {
    const [type, setType] = useState(false)
    const [date, setDate] = useState(new Date())
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [mode, setMode] = useState('LEAD')
    const [grade, setGrade] = useState('5a')
    const [grading, setGrading] = useState('FR')
    const [method, setMethod] = useState('ONSIGHT')


    const [showDatePicker, setShowDatePicker] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowDatePicker(Platform.OS === 'ios')
        setDate(currentDate)
    }
console.log(date)
    return (
        <ScrollView style={styles.mainContainer}>

            <View style={styles.input}>
                <Text style={styles.label}>Type</Text>
                <View style={styles.typeContainer}>
                    <Text style={styles.text}>Sport Climbing</Text>
                    <Switch 
                        value={type} 
                        onValueChange={(value) => {
                            setType(value)
                            if(value) {
                                setGrade('V4')
                                setGrading('V')
                            } else {
                                setGrade('5a')
                                setGrading('FR')
                            }
                        }} 
                        trackColor={{ false: "#767577", true: "#767577" }} 
                        thumbColor={type ? "#f4f3f4" : "#f4f3f4"}/>
                    <Text style={styles.text}>Bouldering</Text>
                </View>
            </View>

            <View style={styles.input}>
                <Text style={styles.label}>Date</Text>
                <TextInput value={date.toDateString()} onTouchStart={() => setShowDatePicker(true)} onFocus={() => Keyboard.dismiss()} style={styles.text}/>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    display="default"
                    onChange={onDateChange}
                />
            )}

            <View style={styles.input}>
                <Text style={styles.label}>Name</Text>
                <TextInput value={name} onChangeText={setName} style={styles.text}/>
            </View>
            
            <View style={styles.input}>
                <Text style={styles.label}>Location</Text>
                <TextInput value={location} onChangeText={setLocation} style={styles.text}/>
            </View>

            {!type && (
                <View style={styles.input}>
                    <Text style={styles.label}>Mode</Text>
                    <Picker selectedValue={mode} onValueChange={(value, index) => setMode(value)}>
                        <Picker.Item label="Lead" value="LEAD" />
                        <Picker.Item label="Top rope" value="TOP_ROPE" />
                        <Picker.Item label="Follow" value="FOLLOW" />
                    </Picker>
                </View>
            )}

            <View style={styles.input}>
                <Text style={styles.label}>Grade</Text>
                <View style={{flexDirection: 'row'}}>
                    <Picker selectedValue={grade} onValueChange={(value, index) => setGrade(value)} style={{flex: 2}}>
                        {
                            type ? (
                                boulderingGrades[grading].map(grade => <Picker.Item label={grade} value={grade} key={grade}/>)
                            ) : (
                                freeClimbingGrades[grading].map(grade => <Picker.Item label={grade} value={grade} key={grade}/>)
                            )
                        }
                    </Picker>
                    <Picker selectedValue={grading} onValueChange={(value, index) => setGrading(value)} style={{flex: 1}}>
                        {
                            type ? (
                                Object.keys(boulderingGrades).map(grading => <Picker.Item label={grading} value={grading} key={grading}/>)
                            ) : (
                                Object.keys(freeClimbingGrades).map(grading => <Picker.Item label={grading} value={grading} key={grading}/>)
                            )
                        }
                    </Picker>
                </View>
            </View>

            <View style={styles.input}>
                <Text style={styles.label}>Method</Text>
                <Picker selectedValue={method} onValueChange={(value, index) => setMethod(value)}>
                    <Picker.Item label='Onsight' value='ONSIGHT'/>
                    <Picker.Item label='Flash' value='FLASH'/>
                    <Picker.Item label='Redpoint' value='REDPOINT'/>
                    <Picker.Item label='Attempts' value='ATTEMPTS'/>
                    <Picker.Item label='Repeat' value='REPEAT'/>
                </Picker>
            </View>

            <Button title='Create route' />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        backgroundColor: 'white'
    },
    input: {
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10
    },
    label: {
        fontSize: 12,
        color: 'grey',
        marginLeft: 5,
        marginTop: 5
    },
    text: {
        fontSize: 16,
    }
})

export default EditRoute