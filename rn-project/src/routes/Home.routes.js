import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../pages/Home';
import HomeDetailsScreen from '../pages/Home.details';

const SiteStack = createStackNavigator(); // 栈导航

const HomeStackScreen = () => {
  return (
    <SiteStack.Navigator>
      <SiteStack.Screen
        name="Home"
        component={HomeScreen}
      />
      <SiteStack.Screen
        name="Details"
        component={HomeDetailsScreen}
      />
    </SiteStack.Navigator>
  );
};

export default HomeStackScreen;