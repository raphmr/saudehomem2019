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