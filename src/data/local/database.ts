// src/data/local/database.ts

import * as SQLite from 'expo-sqlite/next';
import {
    CREATE_TABLE_TASKS,
    CREATE_TABLE_TAGS,
    CREATE_TABLE_TASK_TAGS
} from './schema';

/**
 * Este archivo gestiona la conexión a la base de datos y su inicialización.
 * Utiliza la versión asíncrona de expo-sqlite para no bloquear el hilo principal.
 */

const DB_NAME = "MiAppMaestra.db";
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Abre la conexión a la base de datos.
 * Esta función es asíncrona y devuelve una promesa con la instancia de la DB.
 * @returns {Promise<SQLite.SQLiteDatabase>}
 */
export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (db) {
        return db;
    }

    console.log("Abriendo la base de datos...");
    const openedDb = await SQLite.openDatabaseAsync(DB_NAME);
    db = openedDb;
    return openedDb;
}

/**
 * Inicializa la base de datos creando las tablas si no existen.
 * Esta función debe ser llamada al inicio de la aplicación.
 * @param {SQLite.SQLiteDatabase} db - La instancia de la base de datos.
 */
async function initializeDatabase(db: SQLite.SQLiteDatabase) {
    // Usamos una transacción para asegurar que todas las tablas se creen correctamente.
    // Si una falla, ninguna se crea (atomicidad).
    await db.withTransactionAsync(async () => {
        console.log("Creando tablas si no existen...");
        await db.execAsync(CREATE_TABLE_TASKS);
        await db.execAsync(CREATE_TABLE_TAGS);
        await db.execAsync(CREATE_TABLE_TASK_TAGS);
        console.log("Tablas creadas/verificadas exitosamente.");
    });
}

/**
 * Función principal para obtener la base de datos lista para usar.
 * Abre la conexión y la inicializa.
 * Este es el punto de entrada principal para interactuar con la DB.
 * @returns {Promise<SQLite.SQLiteDatabase>}
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    const db = await openDatabase();
    await initializeDatabase(db);
    return db;
}
