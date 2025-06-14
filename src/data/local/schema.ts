// src/data/local/schema.ts

/**
 * Este archivo define el esquema de la base de datos.
 * Contiene las sentencias SQL para crear todas las tablas necesarias.
 * Tener el esquema centralizado facilita la gestión y las futuras migraciones.
 */

// SQL para crear la tabla de Tareas (Tasks)
// Esta tabla es el corazón del gestor de tareas.
// Incluye campos para sub-tareas (parentId), proyectos, prioridades y estado (para el Kanban).
export const CREATE_TABLE_TASKS = `
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    isProject INTEGER NOT NULL DEFAULT 0,
    progress REAL NOT NULL DEFAULT 0.0,
    status TEXT NOT NULL DEFAULT 'todo',
    priority INTEGER NOT NULL DEFAULT 1,
    dueDate TEXT,
    recurrenceRule TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    parentId TEXT,
    FOREIGN KEY (parentId) REFERENCES tasks(id) ON DELETE CASCADE
  );
`;

// SQL para crear la tabla de Etiquetas (Tags)
// Las etiquetas permiten una organización flexible de las tareas.
export const CREATE_TABLE_TAGS = `
  CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    color TEXT
  );
`;

// SQL para crear la tabla de unión Task_Tags
// Esta es una tabla intermedia para manejar la relación "muchos a muchos"
// entre tareas y etiquetas. Una tarea puede tener muchas etiquetas y
// una etiqueta puede estar en muchas tareas.
export const CREATE_TABLE_TASK_TAGS = `
  CREATE TABLE IF NOT EXISTS task_tags (
    taskId TEXT NOT NULL,
    tagId TEXT NOT NULL,
    PRIMARY KEY (taskId, tagId),
    FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE CASCADE
  );
`;

// Puedes añadir aquí las sentencias para las demás tablas (Gastos, Listas, etc.)
// export const CREATE_TABLE_EXPENSES = `...`;
