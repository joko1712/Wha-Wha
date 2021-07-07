import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert} from 'react-native';
import Colors from '../Colors';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from "@react-native-firebase/auth";


export default class SettingsModal extends React.Component {
   state = {
      //name: '',
      email: '',
      password: '',
   };
   
   handleSignUp = () => {
      const { email, password } = this.state
      auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      })
      .then(() => this.props.navigation.navigate('Login'));
   };
    
  render() {
     return (
        <View style={styles.container}>
           <LinearGradient
              colors={[Colors.purple, Colors.gray]}
              style={styles.linearGradient}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}>
              <Image
                 style={styles.image}
                 source={require("../assets/Icon.png")}
              />
              <TouchableOpacity
                 style={{ position: "absolute", top: 60, left: 32 }}
                 onPress={() => this.props.navigation.navigate('Login')}>
                  <AntDesign name='arrowleft' size={45} color={Colors.black} />
              </TouchableOpacity>

              <Text style={styles.title}>
                  <Text style={{ fontWeight: "300", color: Colors.purple }}>
                     Wha
                  </Text>
                  <Text style={{ fontWeight: "300", color: Colors.tBLue }}>
                     -
                  </Text>
                  <Text
                     style={{
                        fontWeight: "300",
                        color: Colors.sBCrayola,
                     }}>
                     Wha
                  </Text>
               </Text>


               {/*<View style={styles.inputView} >
                  <TextInput  
                    style={styles.inputText}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholderTextColor={Colors.vSBlue}
                    placeholder='Full Name...'/>
               </View>*/}

               <View style={styles.inputView} >
                  <TextInput  
                    style={styles.inputText}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email...'
                    placeholderTextColor={Colors.vSBlue}
                    keyboardType='email-address'
                  />
               </View>

               <View style={styles.inputView} >
                  <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholderTextColor={Colors.vSBlue}
                    placeholder='Password...'/>
               </View>


               <TouchableOpacity style={styles.loginBtn} onPress={this.handleSignUp}>
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
     alignItems: "center",
     justifyContent: "center",
  },
  linearGradient: {
     alignItems: "center",
     justifyContent: "center",
     height: "100%",
     width: "100%",
  },
  image: {
     width: 150,
     height: 150,
  },
   inputView:{
      width:"80%",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:15,
      borderWidth: 3,
      borderColor: Colors.purple,
   },
   inputText:{
      height:50,
      color:"white"
   },
   forgot:{
      color:"white",
      fontSize:11
   },
   loginBtn:{
      width:"80%",
      backgroundColor:Colors.mTurqoise,
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:10
   },
   loginText:{
        color:"white",
        fontSize: 15
    },
   title: {
      fontSize: 38,
      fontWeight: "800",
      color: Colors.black,
      paddingHorizontal: 10,
      marginBottom: 15
   },
});