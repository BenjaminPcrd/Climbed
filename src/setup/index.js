import React, { useEffect} from 'react'

import App from '../App'

import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Setup = () => {

    const setSessions = async() => {
        //await AsyncStorage.setItem('@sessions', JSON.stringify(require('../../sessions.json')))
    }

    useEffect(() => {
        setSessions()
    }, [])

    return <App/>
}

export default Setup

