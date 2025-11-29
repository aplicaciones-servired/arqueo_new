import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerContentComponentProps, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CustomDrawerContent(props: DrawerContentComponentProps) {
	const { logout } = useAuth();
	const colorScheme = useColorScheme();
	return (
		<>
			<ThemedView style={{ padding: 16, alignItems: 'center' }}>
				<Image
					source={require('@/assets/images/logogane.webp')}
					style={{
						width: 300,
						height: 100,
						resizeMode: 'contain',
						marginTop: 20
					}} />
			</ThemedView>

			<DrawerItemList {...props} />


			<DrawerItem
				label="CERRAR SESION"
				activeBackgroundColor='red'
				activeTintColor={Colors[colorScheme ?? 'light'].tint}
				focused={true}
				style={{ marginTop: 'auto' }}
				icon={() => <MaterialIcons name="logout" size={24} color={Colors[colorScheme ?? 'light'].tint} />}
				onPress={() => logout()}
			/>
		</>
	);
}

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Drawer
					drawerContent={CustomDrawerContent}
					screenOptions={{
						drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
						drawerStatusBarAnimation: 'slide',
					}}
				>
					<Drawer.Screen
						name="ArqueoForm" // This is the name of the page and must match the url from root
						options={{
							drawerLabel: 'Inicio',
							title: 'Inicio'
						}}
					/>

					<Drawer.Screen
						name="cronograma" // This is the name of the page and must match the url from root
						options={{
							drawerLabel: 'Cronograma',
							title: 'Cronograma'
						}}
					/>

				</Drawer>
			</GestureHandlerRootView>
		</>
	);
}