import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('database.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, sobrenome TEXT, email TEXT, idade INTEGER, endereco TEXT);'
    );
  });
};

export const salvarUsuario = (
  nome,
  sobrenome,
  email,
  idade,
  endereco,
  onSuccess,
  onError
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO usuarios (nome, sobrenome, email, idade, endereco) VALUES (?, ?, ?, ?, ?)',
      [nome, sobrenome, email, idade, endereco],
      (_, { insertId }) => {
        console.log('Usuário salvo com ID:', insertId);
        onSuccess();
      },
      (_, error) => {
        onError(error);
        return false; // Retorna false para indicar que a transação deve ser revertida
      }
    );
  });
};

export const listarUsuarios = (
  onSuccess,
  onError
) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM usuarios;',
      [],
      (_, result) => onSuccess(result),
      (_, error) => {
        onError(error);
        return false;
      }
    );
  });
};