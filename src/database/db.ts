import SQLite, { SQLiteDatabase, Transaction, ResultSet } from 'react-native-sqlite-storage';

// Define the item structure
export interface Item {
  id: number;
  name: string;
  description: string;
}

// Open the SQLite database
const db: SQLiteDatabase = SQLite.openDatabase(
  { name: 'items.db', location: 'default' },
  () => console.log('Database connected'),
  (error) => console.error('Database error:', error)
);

// Initialize the database and create the table
export const initDB = (): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        description TEXT
      );`,
      [],
      () => console.log('Table created'),
      (_, error) => {
        console.error('Table creation error:', error);
        return false;
      }
    );
  });
};

// Fetch all items from the database
export const getItems = (callback: (items: Item[]) => void): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT * FROM items;',
      [],
      (_, results: ResultSet) => {
        let items: Item[] = [];
        for (let i = 0; i < results.rows.length; i++) {
          items.push(results.rows.item(i));
        }
        callback(items);
      },
      (_, error): boolean => {
        console.error('Error fetching items:', error);
        return false;
      }
    );
  });
};

// Insert a new item into the database
export const insertItem = (
  name: string, 
  description: string, 
  callback: (insertId: number | undefined) => void
): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'INSERT INTO items (name, description) VALUES (?, ?);',
      [name, description],
      (_, results: ResultSet) => {
        callback(results.insertId);
      },
      (_, error): boolean => {
        console.error('Error inserting item:', error);
        return false;
      }
    );
  });
};

// Update an existing item in the database
export const updateItem = (
  id: number, 
  name: string, 
  description: string, 
  callback: (success: boolean) => void
): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'UPDATE items SET name = ?, description = ? WHERE id = ?;',
      [name, description, id],
      (_, results: ResultSet) => {
        callback(results.rowsAffected > 0);
      },
      (_, error): boolean => {
        console.error('Error updating item:', error);
        return false;
      }
    );
  });
};

// Delete an item from the database
export const deleteItem = (id: number, callback: (success: boolean) => void): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'DELETE FROM items WHERE id = ?;',
      [id],
      (_, results: ResultSet) => {
        callback(results.rowsAffected > 0);
      },
      (_, error): boolean => {
        console.error('Error deleting item:', error);
        return false;
      }
    );
  });
};

export default db;
