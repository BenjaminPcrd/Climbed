import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Stats from '../screens/Stats'
import Pie from '../screens/Stats/Pie'

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
            <Stack.Screen name="Stats" component={Stats} options={() => ({ title: translate('stats') })}/>
            <Stack.Screen name="Pie" component={Pie} options={({ route }) => ({ title: route.params.title })}/>
        </Stack.Navigator>
    )
}

export default StatsStack