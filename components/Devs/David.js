import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../Colors';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class David extends React.Component {
  render() {
     return (
        <View style={styles.container}>
           <LinearGradient
              colors={[Colors.purple, Colors.gray]}
              style={styles.linearGradient}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}>

                <TouchableOpacity
                    style={{ position: "absolute", top: '5%', left: '10%' }}
                    onPress={this.props.closeModal}>
                        <AntDesign name='arrowleft' size={45} color={Colors.black} />
                </TouchableOpacity>
                <View
                    style={{ position: "absolute", right:'5%', top:'5%'}}>
                    <Image style={styles.foto} source={{uri: 'https://imgur.com/Ro5zmZt.png'}} />
                </View>
                <View>
                    <Text style={styles.nome}>David Alexandre Teixeira</Text>
                    <Text style={styles.nomeB}>Lavinas Mezia</Text>
                </View>
                <View>
                    <Text>Universidade Autónoma de Lisboa Luís de Camões</Text>
                    <Text>Curso: Engenharia Informática</Text>
                    <Text>Turno: Diurno</Text>
                    <Text>Número: 30003332</Text>
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
  foto:{
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.purple
    },
    nome:{
        fontSize: 30,
    },
    nomeB:{
        fontSize: 30,
        marginBottom: 85,
        alignSelf: 'center'
    }
});