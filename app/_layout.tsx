// app/_layout.tsx

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Importa el CSS global para activar NativeWind en toda la app.
import '../global.css';

export {
  // Captura errores en el árbol de navegación.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Asegura que la ruta inicial sea el grupo de pestañas.
  initialRouteName: '(tabs)',
};

// Previene que la pantalla de carga se oculte automáticamente.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Aquí puedes cargar tus fuentes personalizadas.
    // 'SpaceMono' es de la plantilla, puedes cambiarla o quitarla.
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Manejo de errores durante la carga de fuentes.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Oculta la pantalla de carga una vez que las fuentes están listas.
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // No muestra nada hasta que las fuentes estén cargadas.
  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // Se ha eliminado toda la lógica del tema de color para simplificar.
  // La navegación ahora solo define la estructura principal.
  return (
    <Stack>
      {/* La pantalla principal es el grupo de pestañas, sin encabezado. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Si necesitas un modal en el futuro, puedes añadirlo aquí.
        Por ejemplo, para la "Captura Rápida de Ideas".
        <Stack.Screen name="quick-capture" options={{ presentation: 'modal' }} />
      */}
    </Stack>
  );
}
