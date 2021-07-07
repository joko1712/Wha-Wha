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
            "Password Reset",
            `Go to your E-mail and reset your Password`,
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
         `Do you wish to Sign Out?`,
         [
            {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel",
            },
            {
               text: "Yes",
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
                  <AntDesign name='poweroff' size={45} color={Colors.black} />
              </TouchableOpacity>

              <View styles={styles.defini}>
                  <LinearGradient
                  colors={[Colors.purple, Colors.sBlue]}
                  style={styles.definiGraD}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}>
                     <Text style={styles.title}>Definições</Text>
                  </LinearGradient>
               </View>

              <TouchableOpacity
                 style={{ position: "absolute", top: '5%', left: '10%' }}
                 onPress={() => this.props.navigation.navigate('App')}>
                  <AntDesign name='close' size={45} color={Colors.black} />
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
                        <Text style={styles.items}> Change Password </Text>
                     </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Sobre')}>
                     <LinearGradient
                     colors={[Colors.amethyst, Colors.mTurqoise]}
                     style={styles.definiGra}
                     start={{ x: 1, y: 1 }}
                     end={{ x: 0, y: 0 }}>
                        <Text style={styles.items}> - Sobre Nós - </Text>
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
      fontSize: 35,
      fontWeight: "800",
      color: Colors.white,
      paddingHorizontal: 20,
      marginVertical: 15,
      width: 300,
      paddingHorizontal: 67
   },
   defini:{
      position: 'absolute',
      top: '20%',
      
   },
   definiGraD:{
      borderRadius:25,
      borderWidth:1.5,
      borderRadius:40,
      borderColor: Colors.purple
   },
   definiGra:{
      borderRadius:25,
      borderWidth:2,
      borderRadius:36,
      borderColor: Colors.gray
   },
   items:{
      fontSize: 20,
      fontWeight: "800",
      color: Colors.white,
      paddingHorizontal: 20,
      marginVertical: 20,
   },
   button:{
      marginBottom: 20, 
   }
});