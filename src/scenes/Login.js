import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import logo from '../assets/saudedohomem.png';

var db = openDatabase({ name: 'SaudeHomemDatabase.db' });

// TODO - ADD LOGIN WITH FACEBOOK
class Login extends Component {

  constructor(props) {
    super(props);
    db.transaction(function(transaction) {
      transaction.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='exames'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
          console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA:');
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <Text style={styles.welcome}>Saúde do Homem</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Login"
        />
        <View style={{marginTop: 20}}>
          <Button buttonStyle={{paddingTop: '90px'}}
            onPress={() => this.props.navigation.navigate('Home')}
            title="Acessar sem autenticar"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginTop: 40,
  }
});

export default Login;
