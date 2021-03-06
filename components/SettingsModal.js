import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Colors from '../Colors';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from "@react-native-firebase/auth";


export default class SettingsModal extends React.Component {

   handleSignout = () => {
      auth()
         .signOut()
         .then(() => console.log('User signed out!'))
         .then(() => this.props.navigation.navigate('Login'));
   }   

   passChange = () => {
      auth()
         .sendPasswordResetEmail(auth().currentUser.email)
         Alert.alert(
            "Redefinir Password",
            `Vá para o seu e-mail e redefina sua senha`,
            [
               {
                  text: "Ok",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
               }
            ]
         );

   }

   
   signOutAlert = () => {
      Alert.alert(
         "Sign Out",
         `Deseja dar Sign Out?`,
         [
            {
               text: "Não",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel",
            },
            {
               text: "Sim",
               onPress: () => this.handleSignout(),
            },
         ]
      );
   };

  render() {
     return (
        <View style={styles.container}>
           <LinearGradient
              colors={[Colors.purple, Colors.gray]}
              style={styles.linearGradient}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}>
                 
               <TouchableOpacity
                 style={{ position: "absolute", top: '5%', right: '10%' }}
                 onPress={this.signOutAlert}>
                  <AntDesign name='poweroff' size={45} color={Colors.sBlue} />
              </TouchableOpacity>

              <View>
                  <Text style={styles.title}>Definições</Text>
               </View>

              <TouchableOpacity
                 style={{ position: "absolute", top: '5%', left: '10%' }}
                 onPress={() => this.props.navigation.navigate('App')}>
                  <AntDesign name='close' size={45} color={Colors.sBlue} />
              </TouchableOpacity>

              <View
                 style={{
                    height: 450,
                    weight: 500,
                    alignItems: "center",
                    justifyContent: "center",
                 }}>

                  <TouchableOpacity style={styles.button} onPress={() => this.passChange()}>
                     <LinearGradient
                     colors={[Colors.amethyst, Colors.sBlue]}
                     style={styles.definiGra}
                     start={{ x: 1, y: 1 }}
                     end={{ x: 0, y: 0 }}>
                        <Text style={styles.items}> Redefinir Password </Text>
                     </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Sobre')}>
                     <LinearGradient
                     colors={[Colors.amethyst, Colors.mTurqoise]}
                     style={styles.definiGra}
                     start={{ x: 1, y: 1 }}
                     end={{ x: 0, y: 0 }}>
                        <Text style={styles.items}> - Sobre nós - </Text>
                     </LinearGradient>
                  </TouchableOpacity>

               </View>
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
   title: {
      fontSize: 55,
      fontWeight: "800",
      color: Colors.white,
      paddingHorizontal: 20,
      marginVertical: 10,
      width: 300,
      textAlign: 'center'

   },
   definiGraD:{
      borderRadius:25,
      borderWidth:1.5,
      borderRadius:40,
      borderColor: Colors.purple,
   },
   definiGra:{
      borderRadius:25,
      borderWidth:2,
      borderRadius:36,
      borderColor: Colors.gray,
      alignItems: "center",
      justifyContent: "center",
   },
   items:{
      fontSize: 20,
      fontWeight: "800",
      color: Colors.white,
      paddingHorizontal: 20,
      marginVertical: 20,
      alignItems: "center",
      justifyContent: "center",
   },
   button:{
      marginBottom: 20, 
      alignItems: "center",
      justifyContent: "center",
   }
});