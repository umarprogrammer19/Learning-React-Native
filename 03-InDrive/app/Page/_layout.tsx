import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            width: 250,
            backgroundColor: '#3f3f3f',
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Indrive',
            headerStyle: {
              backgroundColor: '#c1f11d',
            },
            drawerLabelStyle: {
              color: '#ffffff', // Set the text color for this screen's drawer label
            },
          }}
        />
        <Drawer.Screen
          name="About"
          options={{
            drawerLabel: 'About',
            title: 'About',
            headerStyle: {
              backgroundColor: '#c1f11d',
            },
            drawerLabelStyle: {
              color: '#ffffff', // Set the text color for this screen's drawer label
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
