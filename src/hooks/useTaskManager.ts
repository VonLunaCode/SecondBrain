// src/modules/1_taskManager/hooks/useTaskManager.ts

import { useState, useEffect, useCallback } from 'react';
// RUTA CORREGIDA con el método tradicional
import { taskRepository } from '../data/repositories/TaskRepository';
import { Task } from '../modules/1_taskManager/types';

export function useTaskManager() {
    const [projects, setProjects] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProjects = useCallback(async () => {
        try {
            setIsLoading(true);
            const fetchedProjects = await taskRepository.getAllProjects();
            setProjects(fetchedProjects);
            setError(null);
        } catch (e) {
            setError(e as Error);
            console.error("Error al obtener los proyectos:", e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const createProject = useCallback(async (title: string) => {
        try {
            const partialTask = {
                title,
                status: 'todo' as const,
                priority: 1 as const
            };

            await taskRepository.create(partialTask);
            await fetchProjects();
        } catch (e) {
            setError(e as Error);
            console.error("Error al crear el proyecto:", e);
        }
    }, [fetchProjects]);

    return {
        projects,
        isLoading,
        error,
        refreshProjects: fetchProjects,
        createProject,
    };
}
