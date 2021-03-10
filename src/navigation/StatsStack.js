import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Stats from '../screens/Stats'

import { translate } from '../translations'

const Stack = createStackNavigator()

const screenOptions = {
    headerStyle: {
        backgroundColor: 'darkblue',
    },
    headerTintColor: 'white'
}

const StatsStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Stats" component={Stats}/>
        </Stack.Navigator>
    )
}

export default StatsStack