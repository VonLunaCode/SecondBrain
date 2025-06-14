// app/(tabs)/index.tsx

import { SafeAreaView, Text, View, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// RUTAS CORREGIDAS con el método tradicional
import { useTaskManager } from '../../src/modules/1_taskManager/hooks/useTaskManager';
import { Task } from '../../src/modules/1_taskManager/types';

const TaskCard = ({ task }: { task: Task }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{task.title}</Text>
    <Text style={styles.cardDescription}>
      {task.description || 'Sin descripción'}
    </Text>
    <View style={styles.cardSeparator} />
    <View style={styles.cardFooter}>
      <Text style={styles.cardPriorityText}>
        Prioridad: {task.priority}
      </Text>
      <View style={styles.statusBadge}>
        <Text style={styles.statusBadgeText}>
          {task.status.toUpperCase()}
        </Text>
      </View>
    </View>
  </View>
);

export default function TabOneScreen() {
  const { projects, isLoading, error, createProject } = useTaskManager();

  const handleCreateTestProject = () => {
    const projectTitle = `Nuevo Proyecto de Prueba ${new Date().toLocaleTimeString()}`;
    createProject(projectTitle);
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#8b5cf6" style={{ marginTop: 64 }} />;
    }
    if (error) {
      return <Text style={styles.errorText}>Error al cargar las tareas.</Text>;
    }
    if (projects.length === 0) {
      return (
        <View style={styles.placeholderContainer}>
          <FontAwesome name="check-square-o" size={48} color="#cbd5e1" />
          <Text style={styles.placeholderText}>
            No tienes proyectos. ¡Crea el primero!
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={projects}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mis Tareas</Text>
          <Text style={styles.headerSubtitle}>¡Es hora de ser productivo!</Text>
        </View>

        {renderContent()}

        <Pressable onPress={handleCreateTestProject} style={styles.fab}>
          <FontAwesome name="plus" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Estilos creados con StyleSheet
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  pageContainer: { flex: 1, padding: 24 },
  header: { marginBottom: 32 },
  headerTitle: { fontSize: 36, fontWeight: '800', color: '#1e293b' },
  headerSubtitle: { fontSize: 18, color: '#64748b' },
  errorText: { marginTop: 64, textAlign: 'center', color: '#ef4444' },
  placeholderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 16, borderWidth: 2, borderStyle: 'dashed', borderColor: '#cbd5e1', backgroundColor: '#ffffff' },
  placeholderText: { marginTop: 16, textAlign: 'center', fontWeight: 'bold', color: '#94a3b8' },
  fab: { position: 'absolute', bottom: 24, right: 24, height: 64, width: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 32, backgroundColor: '#8b5cf6', elevation: 5, shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { height: 2, width: 0 } },
  card: { marginBottom: 16, borderRadius: 12, backgroundColor: '#ffffff', padding: 16, elevation: 2, shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { height: 1, width: 0 } },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  cardDescription: { marginTop: 4, color: '#475569' },
  cardSeparator: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 16 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPriorityText: { fontSize: 14, color: '#94a3b8' },
  statusBadge: { backgroundColor: '#ede9fe', borderRadius: 9999, paddingVertical: 4, paddingHorizontal: 8 },
  statusBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#8b5cf6' },
});
