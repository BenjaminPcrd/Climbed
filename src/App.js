import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons'

// SessionStack Components
import Sessions from './screens/Sessions'
import Session from './screens/Session'
import AddSession from './screens/AddSession'
import AddClimb from './screens/AddClimb'

import Stats from './screens/Stats'

import { translate } from './translations'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {

    const SessionsStack = () => {
        return (
            <Stack.Navigator screenOptions={options.stackScreen}>
                <Stack.Screen name="Sessions" component={Sessions}/>
                <Stack.Screen name="Session" component={Session} options={({ route }) => ({ title: route.params.title })}/>
                <Stack.Screen name="AddSession" component={AddSession} options={{ title: translate('addSession') }}/>
                <Stack.Screen name="AddClimb" component={AddClimb} options={{ title: translate('addClimb') }}/>
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={options.tabBar} screenOptions={options.tabScreen}>
                <Tab.Screen name="SessionsStack" component={SessionsStack} options={{ title: translate('sessions') }}/>
                <Tab.Screen name="Stats" component={Stats} />
             </Tab.Navigator>
        </NavigationContainer>
    )
}

const options = {
    stackScreen: {
        headerStyle: {
            backgroundColor: 'darkblue',
        },
        headerTintColor: 'white'
    },

    tabScreen: ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch(route.name) {
                case 'SessionsStack': iconName = 'list-circle-outline'; break
                case 'Stats': iconName = 'stats-chart'; break
            }
            return <Icon name={iconName} size={size} color={color} />
        }
    }),

    tabBar: {
        activeBackgroundColor: 'darkblue',
        activeTintColor: 'white',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'darkblue',
        labelPosition: 'beside-icon',
        keyboardHidesTabBar: true
    }
    
}


export default App