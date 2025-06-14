// src/modules/1_taskManager/types.ts

// Define la estructura de una Etiqueta (Tag)
export interface Tag {
    id: string;
    name: string;
    color?: string;
}

// Define la estructura de una Tarea (Task)
// Usamos tipos claros para cada campo, por ejemplo, `status` solo puede ser uno de los tres valores.
export interface Task {
    id: string;
    title: string;
    description?: string;
    isProject: boolean;
    progress: number;
    status: 'todo' | 'in-progress' | 'done';
    priority: 1 | 2 | 3 | 4; // 1: Alta, 4: Baja
    dueDate?: string; // Formato ISO 8601: "YYYY-MM-DDTHH:mm:ss.sssZ"
    recurrenceRule?: string; // (Para el futuro) e.g., 'RRULE:FREQ=WEEKLY;BYDAY=MO'
    createdAt: string;
    updatedAt: string;
    parentId?: string | null; // Para subtareas
    tags?: Tag[]; // Las etiquetas asociadas a esta tarea
}
