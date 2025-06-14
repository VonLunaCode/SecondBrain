// app/(tabs)/two.tsx

import { SafeAreaView, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Usamos otro set de iconos

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 p-6">

        {/* Encabezado */}
        <View className="mb-8">
          <Text className="text-4xl font-extrabold text-slate-800">
            Mis Gastos
          </Text>
          <Text className="text-lg text-slate-500">
            Control total de tus finanzas.
          </Text>
        </View>

        {/* Gráfico de ejemplo (Placeholder) */}
        <View className="h-64 items-center justify-center rounded-2xl bg-white p-4 shadow-sm">
          <FontAwesome5 name="chart-pie" size={48} color="#cbd5e1" />
          <Text className="mt-4 text-center font-bold text-slate-400">
            Tu reporte financiero mensual aparecerá aquí.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}
