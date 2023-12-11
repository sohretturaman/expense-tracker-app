import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpense';
import Icon from './components/Icon';
import {IconButton} from 'react-native-paper';
import {Colors} from './components/Colors';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Recent Expenses',
          headerStyle: {
            backgroundColor: '#392C78',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignItems: 'center',
            fontWeight: 'bold',
          },
          headerRight: () => <Icon />,
        }}>
        <Stack.Screen name="RootBottom" component={BottomTabFunc} />
        <Stack.Screen name="ManageExpense" component={ManageExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabFunc = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.primary,
        //tabBarLabel: 'Recent',
        tabBarShowLabel: true,
      }}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarActiveTintColor: Colors.gold,
          tabBarLabel: 'Recents',
          tabBarIcon: (
            {focused}, //using buttonIcon from react native paper is doesn't work here !!
          ) => (
            <MaterialCIcon
              name="timer-sand"
              size={30}
              color={focused ? Colors.gold : 'white'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarLabel: 'All Expenses',
          tabBarActiveTintColor: Colors.gold,
          tabBarIcon: ({focused}) => (
            <MaterialCIcon
              name="calendar"
              size={30}
              color={focused ? Colors.gold : 'white'}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
