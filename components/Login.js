import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import Colors from '../Colors';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    user: {},
  };

  handleLogin = () => {
    const {email, password} = this.state;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('App'));
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.purple, Colors.gray]}
          style={styles.linearGradient}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}>
          <Image style={styles.image} source={require('../assets/Icon.png')} />

          <Text style={styles.title}>
            <Text style={{fontWeight: '300', color: Colors.purple}}>Wha</Text>
            <Text style={{fontWeight: '300', color: Colors.tBLue}}>-</Text>
            <Text
              style={{
                fontWeight: '300',
                color: Colors.sBCrayola,
              }}>
              Wha
            </Text>
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor={Colors.vSBlue}
              value={this.state.email}
              onChangeText={email => this.setState({email})}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor={Colors.vSBlue}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.loginText}>SignUp</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    width: 150,
    height: 150,
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 3,
    borderColor: Colors.purple,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: Colors.mTurqoise,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 15,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.black,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});