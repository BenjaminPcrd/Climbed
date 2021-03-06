import React, { useState, useEffect } from 'react'

import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'

import { Picker } from '@react-native-picker/picker'

import { translate } from '../../translations'

import gradesTab from '../../assets/grades'

const AddClimb = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('SPORT_CLIMBING')
    const [mode, setMode] = useState('LEAD')
    const [grade, setGrade] = useState('1')
    const [grading, setGrading] = useState('FR')
    const [style, setStyle] = useState('ONSIGHT')

    const onTypeChange = (value) => {
        setGrading(Object.keys(gradesTab[value])[0])
        setGrade(gradesTab[value][Object.keys(gradesTab[value])[0]][0])
        setType(value)
    }

    const onGradingChange = (value) => {
        setGrade(gradesTab[type][value][0])
        setGrading(value)
    }

    return (
        <View>
            <View style={styles.input}>
                <Text style={styles.label}>{translate('name')}</Text>
                <TextInput value={name} onChangeText={setName} underlineColorAndroid='darkblue'/>
            </View>

            <View style={styles.input}>
                <Text style={styles.label}>{translate('type')}</Text>
                <Picker selectedValue={type} onValueChange={onTypeChange} mode='dropdown'>
                    <Picker.Item label={translate('SPORT_CLIMBING')} value="SPORT_CLIMBING" />
                    <Picker.Item label={translate('TRAD_CLIMBING')} value="TRAD_CLIMBING" />
                    <Picker.Item label={translate('ICE_CLIMBING')} value="ICE_CLIMBING" />
                    <Picker.Item label={translate('AID_CLIMBING')} value="AID_CLIMBING" />
                    <Picker.Item label={translate('BOULDERING')} value="BOULDERING" />
                </Picker>
            </View>

            {type !== 'BOULDERING' && (
                <View style={styles.input}>
                    <Text style={styles.label}>{translate('mode')}</Text>
                    <Picker selectedValue={mode} onValueChange={setMode} mode='dropdown'>
                        <Picker.Item label={translate('LEAD')} value="LEAD" />
                        <Picker.Item label={translate('TOP_ROPE')} value="TOP_ROPE" />
                        <Picker.Item label={translate('FOLLOW')} value="FOLLOW" />
                    </Picker>
                </View>
            )}

            <View style={[styles.input, {flexDirection: 'row'}]}>
                <View style={{flex: 2}}>
                    <Text style={styles.label}>{translate('grade')}</Text>
                    <Picker selectedValue={grade} onValueChange={setGrade} mode='dropdown'>
                        {
                            gradesTab[type][grading].map(item => <Picker.Item label={item} value={item} key={item} />)
                        }
                    </Picker>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>{translate('grading')}</Text>
                    <Picker selectedValue={grading} onValueChange={onGradingChange} mode='dropdown'>
                        {
                            Object.keys(gradesTab[type]).map(item => <Picker.Item label={item} value={item} key={item} />)
                        }
                    </Picker>
                </View>
            </View>

            <View style={styles.input}>
                <Text style={styles.label}>{translate('style')}</Text>
                <Picker selectedValue={style} onValueChange={setStyle} mode='dropdown'>
                    <Picker.Item label={translate('ONSIGHT')} value="ONSIGHT" />
                    <Picker.Item label={translate('FLASH')} value="FLASH" />
                    <Picker.Item label={translate('REDPOINT')} value="REDPOINT" />
                    <Picker.Item label={translate('REPEAT')} value="REPEAT" />
                    <Picker.Item label={translate('ATTEMPTS')} value="ATTEMPTS" />
                </Picker>
            </View>

            <View style={styles.input}>
                <Button title={translate('addClimb')} color='darkblue'/>
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

export default AddClimb