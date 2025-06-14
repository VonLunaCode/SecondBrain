// app/+not-found.tsx

import { Link, Stack } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      {/* Configura el título de la pantalla en la barra de navegación */}
      <Stack.Screen options={{ title: '¡Oops!' }} />

      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1 items-center justify-center p-5">

          <FontAwesome name="exclamation-triangle" size={60} color="#f59e0b" />

          <Text className="mt-6 text-2xl font-extrabold text-slate-800">
            Pantalla no encontrada
          </Text>

          <Text className="mt-2 max-w-xs text-center text-base text-slate-500">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </Text>

          {/* El componente Link de expo-router funciona bien con className */}
          <Link href="/" className="mt-8 rounded-lg bg-purple-600 p-4">
            <Text className="text-base font-bold text-white">
              Ir a la pantalla de inicio
            </Text>
          </Link>

        </View>
      </SafeAreaView>
    </>
  );
}
