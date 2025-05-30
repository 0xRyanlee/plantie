import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import FloatingTabBar from '../../components/layout/FloatingTabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={props => <FloatingTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首頁',
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: '分類',
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: '收藏',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: '社群',
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: '我的',
        }}
      />
    </Tabs>
  );
}
