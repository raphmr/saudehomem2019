import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'SaudeHomemDatabase.db' });

export const getExames = async () => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM exames', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }

        resolve(temp);
        
      });
    });
  });
}

export const salvarExame = async (exame) => {
    db.transaction(function (transaction) {
        transaction.executeSql(
        'INSERT INTO exames (nome, idadeRecomendada, frequencia, detalhes) VALUES (?,?,?,?)',
        [exame.title, exame.idade, exame.frequencia, exame.content],
        (transaction, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
            console.log('Success');
            } else {
            console.log('Failed');
            }
        }
        );
    });
}

export const deletarExames = async () => {
  db.transaction(function (transaction) {
    transaction.executeSql(
      'DELETE FROM exames', [],
      (transaction, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Success');
        } else {
          console.log('Failed');
        }
      }
    );
  });
}

export const inicializarTabelaExames = async () => {
  db.transaction(function(transaction) {
    transaction.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='exames'",
      [],
      function(tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
        transaction.executeSql('DROP TABLE IF EXISTS exames', []);
          transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS exames
            (_id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome VARCHAR(50), 
              idadeRecomendada INT, 
              frequencia VARCHAR(30),
              detalhes VARCHAR(2000) 
              )`,
            []
          );
        }
      }
    );
  });
}