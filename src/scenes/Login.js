import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import logo from '../assets/saudedohomem.png';
import { inicializarTabelaExames } from '../services/dbhelper'

// TODO - ADD LOGIN WITH FACEBOOK
class Login extends Component {

  constructor(props) {
    super(props);
    inicializarTabelaExames();
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
