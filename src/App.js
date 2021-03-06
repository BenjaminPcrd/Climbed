import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import Sessions from './screens/Sessions'
import Session from './screens/Session'
import Routes from './screens/Routes'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {

    const SessionsStack = () => {
        return (
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'darkblue',
                    },
                    headerTintColor: 'white'
                }}
            >
                <Stack.Screen name="Sessions" component={Sessions}/>
                <Stack.Screen name="Session" component={Session} options={({ route }) => ({ title: route.params.title })}/>
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="SessionsStack" component={SessionsStack} />
                <Tab.Screen name="Routes" component={Routes} />
             </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App