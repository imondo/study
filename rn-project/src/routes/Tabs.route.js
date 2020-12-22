import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Mine from '../pages/Mine';

import HomeScreen from './Home.routes';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ // tab style
          activeTintColor: '#FE9727',
          inactiveTintColor: '#222222',
          tabStyle: {},
        }}>
        <Tab.Screen
          name="Home" // 路由名称
          component={HomeScreen} // 对应的路由
          options={{
            tabBarLabel: '首页', // tab name
          }}
        />
        <Tab.Screen
          name="Mine"
          component={Mine} // 对应的路由
          options={{
            tabBarLabel: '我的', // tab name
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};