import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import Sessions from './screens/Sessions'
import Routes from './screens/Routes'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Sessions" component={Sessions} />
                <Tab.Screen name="Routes" component={Routes} />
             </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App