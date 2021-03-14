import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Sessions from '../screens/Sessions'
import Session from '../screens/Session'
import AddSession from '../screens/AddSession'
import AddClimb from '../screens/AddClimb'

import { translate } from '../translations'

const Stack = createStackNavigator()

const screenOptions = {
    headerStyle: {
        backgroundColor: 'darkblue',
    },
    headerTintColor: 'white'
}

const SessionsStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Sessions" component={Sessions}/>
            <Stack.Screen name="Session" component={Session} options={({ route }) => ({ title: route.params.title })}/>
            <Stack.Screen name="AddSession" component={AddSession} options={({ route }) => ({ title: route.params?.sessionToEdit ? translate('editSession') : translate('addSession') })}/>
            <Stack.Screen name="AddClimb" component={AddClimb} options={({ route }) => ({ title: route.params?.climbToEdit ? translate('editClimb') : translate('addClimb') })}/>
        </Stack.Navigator>
    )
}

export default SessionsStack