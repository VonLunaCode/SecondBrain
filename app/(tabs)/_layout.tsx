// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Un componente de icono reutilizable y limpio para la barra de pestañas.
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  // Usamos el mismo componente FontAwesome para todos los iconos.
  // El tamaño se ajusta para que se vea bien en la barra.
  return <FontAwesome size={22} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Define el color del icono y el texto de la pestaña activa.
        // Usamos un color fijo en lugar de uno que dependa del tema del dispositivo.
        tabBarActiveTintColor: '#8b5cf6', // Un tono de morado

        // Define el color del icono y el texto de las pestañas inactivas.
        tabBarInactiveTintColor: '#a1a1aa', // Un tono de gris

        // Ocultamos el encabezado por defecto en todas las pestañas.
        // Esto nos da control total para añadir encabezados personalizados
        // dentro de cada pantalla si lo necesitamos.
        headerShown: false,

        // Estilos para la barra de pestañas en sí.
        tabBarStyle: {
          backgroundColor: '#ffffff', // Fondo blanco
          borderTopWidth: 0, // Sin línea superior para un look más limpio
          elevation: 5, // Sombra sutil en Android
          shadowOpacity: 0.1, // Sombra sutil en iOS
        }
      }}>

      {/* Pestaña 1: Gestor de Tareas */}
      <Tabs.Screen
        // `name` debe coincidir con el nombre del archivo: `index.tsx`
        name="index"
        options={{
          title: 'Tareas', // El texto que se muestra en la pestaña
          tabBarIcon: ({ color }) => <TabBarIcon name="check-square" color={color} />,
        }}
      />

      {/* Pestaña 2: Gestor de Gastos */}
      <Tabs.Screen
        // `name` debe coincidir con el nombre del archivo: `two.tsx`
        name="two"
        options={{
          title: 'Gastos', // El texto que se muestra
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card" color={color} />,
        }}
      />

      {/* Puedes añadir aquí las futuras pestañas para los otros módulos */}
      {/* Por ejemplo, para el CRM:
      <Tabs.Screen
        name="people" // (Necesitarás crear un archivo `people.tsx`)
        options={{
          title: 'Personas',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      */}
    </Tabs>
  );
}
