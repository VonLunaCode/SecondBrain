// src/data/repositories/TaskRepository.ts

import { getDatabase } from '../local/database';
// RUTA CORREGIDA con el método tradicional
import { Task } from '../../modules/1_taskManager/types';
import { randomUUID } from 'expo-crypto';

// El resto del código no cambia...
export const taskRepository = {

    async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'isProject' | 'tags'>): Promise<Task> {
        const db = await getDatabase();

        const now = new Date().toISOString();
        const newTask: Task = {
            id: randomUUID(),
            ...taskData,
            isProject: taskData.parentId ? false : true,
            progress: 0,
            createdAt: now,
            updatedAt: now,
        };

        const result = await db.runAsync(
            'INSERT INTO tasks (id, title, description, isProject, status, priority, dueDate, createdAt, updatedAt, parentId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            newTask.id,
            newTask.title,
            newTask.description || null,
            newTask.isProject ? 1 : 0,
            newTask.status,
            newTask.priority,
            newTask.dueDate || null,
            newTask.createdAt,
            newTask.updatedAt,
            newTask.parentId || null
        );

        console.log('Tarea creada con ID:', result.lastInsertRowId);
        return newTask;
    },

    async getAllProjects(): Promise<Task[]> {
        const db = await getDatabase();
        const allRows = await db.getAllAsync<any>(
            'SELECT * FROM tasks WHERE parentId IS NULL ORDER BY createdAt DESC'
        );
        return allRows.map(row => ({
            ...row,
            isProject: row.isProject === 1,
        }));
    },

    async getSubtasks(parentId: string): Promise<Task[]> {
        const db = await getDatabase();
        const allRows = await db.getAllAsync<any>(
            'SELECT * FROM tasks WHERE parentId = ? ORDER BY createdAt ASC',
            parentId
        );
        return allRows.map(row => ({
            ...row,
            isProject: row.isProject === 1,
        }));
    },
};
