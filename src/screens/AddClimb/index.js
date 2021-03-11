import React, { useState, useEffect, useLayoutEffect } from 'react'

import {
    View,
    Text,
    TextInput,
    Switch,
    Alert,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { HeaderBackButton } from '@react-navigation/stack'

import { Picker } from '@react-native-picker/picker'

import { addClimb, editClimb } from '../../asyncStorageApi'

import { translate } from '../../translations'

import gradesTab from '../../assets/grades'

const pitchesArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']

const AddClimb = ({ navigation, route }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('SPORT_CLIMBING')
    const [isMultiPitch, setIsMultiPitch] = useState(false)
    const [pitches, setPitches] = useState('2')
    const [mode, setMode] = useState('LEAD')
    const [grade, setGrade] = useState('1')
    const [grading, setGrading] = useState('FR')
    const [style, setStyle] = useState('ONSIGHT')

    const onTypeChange = (value) => {
        setGrading(Object.keys(gradesTab[value])[0])
        setGrade(gradesTab[value][Object.keys(gradesTab[value])[0]][0])
        setMode('LEAD')
        setType(value)
    }

    const onGradingChange = (value) => {
        setGrade(gradesTab[type][value][0])
        setGrading(value)
    }

    const onIsMultiPitchChange = (value) => {
        value && Alert.alert(
            translate('multiPitch'),
            translate('multiPitchAlertMsg'),
            [{ text: 'ok' }],
            { cancelable: true }
        )
        setIsMultiPitch(value)
    }

    const [isSubmitPressed, setIsSubmitPressed] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: ({ tintColor }) => <Icon name='close-outline' color={tintColor} size={27}/>,
            headerRight: ({ tintColor }) => <HeaderBackButton backImage={() => <Icon name='checkmark-outline' color={tintColor} size={27}/>} onPress={() => setIsSubmitPressed(true)}/> 
        })
    }, [navigation])

    useEffect(() => {
        if(route.params.climbToEdit) {
            let climb = route.params.climbToEdit
            climb.name ? setName(climb.name) : setName('')
            setType(climb.type)
            climb.pitches && setIsMultiPitch(true)
            climb.pitches && setPitches(climb.pitches)
            climb.type !== 'BOULDER' && setMode(climb.mode)
            setGrading(climb.grade.grading)
            setGrade(climb.grade.grade)
            setStyle(climb.style)
        }
    }, [])

    useEffect(() => {
        if(isSubmitPressed) {
            route.params.climbToEdit ? onEditSubmit() : onSubmit()
        }
    }, [isSubmitPressed])

    const onSubmit = () => {
        const climbToAdd = {
            ...(name.length > 0 && { name }),
            type,
            ...(type !== 'BOULDERING' && isMultiPitch && { pitches }),
            ...(type !== 'BOULDERING' && { mode }),
            grade: { grade, grading },
            style,
            index: route.params.session.climbs.length
        }
        addClimb(climbToAdd, route.params.session)
            .then((newSession) => navigation.navigate('Session', { session: newSession, title: `${newSession.location} - ${new Date(newSession.date).toLocaleDateString()}` }))
            .catch(e => console.error(e))
    }

    const onEditSubmit = () => {
        const climbToEdit = {
            ...(name.length > 0 && { name }),
            type,
            ...(type !== 'BOULDERING' && isMultiPitch && { pitches }),
            ...(type !== 'BOULDERING' && { mode }),
            grade: { grade, grading },
            style,
            index: route.params.climbToEdit.index
        }

        editClimb(climbToEdit, route.params.session)
            .then((newSession) => navigation.navigate('Session', { session: newSession, title: `${newSession.location} - ${new Date(newSession.date).toLocaleDateString()}` }))
            .catch(e => console.error(e))

        setIsSubmitPressed(false)
    }

    return (
        <View>
            {route.params.session.type === 'OUTDOOR' && (
                <View style={styles.input}>
                    <Text style={styles.label}>{translate('name')}</Text>
                    <TextInput value={name} onChangeText={setName} underlineColorAndroid='darkblue'/>
                </View>
            )}
            
            <View style={styles.input}>
                <Text style={styles.label}>{translate('type')}</Text>
                <Picker selectedValue={type} onValueChange={onTypeChange} mode='dropdown'>
                    <Picker.Item label={translate('SPORT_CLIMBING')} value="SPORT_CLIMBING" />
                    {route.params.session.type === 'OUTDOOR' && <Picker.Item label={translate('TRAD_CLIMBING')} value="TRAD_CLIMBING" />}
                    {route.params.session.type === 'OUTDOOR' && <Picker.Item label={translate('ICE_CLIMBING')} value="ICE_CLIMBING" />}
                    {route.params.session.type === 'OUTDOOR' && <Picker.Item label={translate('AID_CLIMBING')} value="AID_CLIMBING" />}
                    <Picker.Item label={translate('BOULDERING')} value="BOULDERING" />
                </Picker>
            </View>

            {route.params.session.type === 'OUTDOOR' && type !== 'BOULDERING' && (
                <View style={styles.input}>
                    <Text style={styles.label}>{translate('multiPitch')}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Picker selectedValue={pitches} onValueChange={setPitches} mode='dropdown' style={{flex: 1}} enabled={isMultiPitch}>
                            {pitchesArray.map(item => <Picker.Item label={`${item} ${translate('pitches')}`} value={item} key={item} color={isMultiPitch ? 'black' : 'lightgrey'}/>)}
                        </Picker>
                        <Switch
                            trackColor={{ false: 'grey', true: 'darkblue' }}
                            thumbColor={'white'}
                            onValueChange={onIsMultiPitchChange}
                            value={isMultiPitch}
                        />
                    </View>
                </View>
            )}
            

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
                <View style={{flex: 1}}>
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