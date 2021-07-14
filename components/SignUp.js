import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert,alert} from 'react-native';
import Colors from '../Colors';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from "@react-native-firebase/auth";


export default class SettingsModal extends React.Component {
   state = {
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
         Alert.alert(
            "Erro SignUp",
            "E-mail já está em uso!",
            [
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
         );
          console.log('That email address is already in use!');
        }
        console.error(error);
      })
      .then(() => this.props.navigation.navigate('Login'));
   };
   
   validate = () => {
      console.log(text);
      let text = this.state.email; 
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
         console.log("Email is Not Correct!!!");
         Alert.alert(
            "Erro Login",
        "E-mail não está correto!",
        [
        { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      return false;
    }
    if (this.state.password.length <= 8){
        console.log("Password não está segura");
        Alert.alert(
          "Erro Login",
          "Password tem de ter pelo menos 8 caracteres!",
          [
          { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      return false;
      }
      else {
         this.setState({ email:text})
         console.log("Email is Correct", this.state.email);
         this.handleSignUp();
      }
   }
    
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


               <View style={styles.inputView} >
                  <TextInput  
                    style={styles.inputText}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email:text})}
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


               <TouchableOpacity style={styles.loginBtn} onPress={this.validate}>
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