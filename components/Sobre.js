import React, { useReducer } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert} from 'react-native';
import Colors from '../Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ze from './Devs/Ze';
import David from './Devs/David';
import Tomas from './Devs/Tomas';


export default class Sobre extends React.Component {
    state = {
        zeVisible: false,
        tomasVisible: false,
        davidVisible: false,
    }

    toggleZe() {
        this.setState({ zeVisible: !this.state.zeVisible });
    }
     
    toggleDavid() {
        this.setState({ davidVisible: !this.state.davidVisible });
    }

    toggleTomas() {
        this.setState({ tomasVisible: !this.state.tomasVisible });
    }
   
    render() {
        return (
           <View style={styles.container}>
               <TouchableOpacity
                 style={{ position: "absolute", top: '5%', left: '10%' }}
                 onPress={() => this.props.navigation.navigate('Settings')}>
                  <AntDesign name='arrowleft' size={45} color={Colors.black} />
              </TouchableOpacity>

              <Modal
                animationType='slide'
                visible={this.state.zeVisible}
                onRequestClose={() => this.toggleZe()}>
                <Ze
                    closeModal={() => this.toggleZe()}
                />
              </Modal>
              <Modal
                animationType='slide'
                visible={this.state.tomasVisible}
                onRequestClose={() => this.toggleTomas()}>
                <Tomas
                    closeModal={() => this.toggleTomas()}
                />
              </Modal>
              <Modal
                animationType='slide'
                visible={this.state.davidVisible}
                onRequestClose={() => this.toggleDavid()}>
                <David
                    closeModal={() => this.toggleDavid()}
                />
              </Modal>
              


                <TouchableOpacity
                    style={{ position: "absolute", left:'5%', top:'30%'}}
                    onPress={() => this.toggleZe()}>
                    <Image style={styles.fotoZe} source={{uri: 'https://imgur.com/lYf71Nk.png'}} />
                    <Text style={styles.textName}>José Pedreira</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ position: "absolute", left:'30%', top:'53%' }}
                    onPress={() => this.toggleTomas()}>
                    <Image style={styles.fotoTomas} source={{uri: 'https://imgur.com/TxDfz0H.png'}} />
                    <Text style={styles.textName}>Tomás Reis</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ position: "absolute", right:'5%', top:'30%' }}
                    onPress={() => this.toggleDavid()}>
                    <Image style={styles.fotoDavid} source={{uri: 'https://imgur.com/Ro5zmZt.png'}} />
                    <Text style={styles.textName}>David Mezia</Text>
                </TouchableOpacity>

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
    fotoZe:{
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: Colors.purple
    },
    fotoTomas:{
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: Colors.amethyst
    },
    fotoDavid:{
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: Colors.tBLue
    },
    textName:{
        alignSelf: 'center',
        fontSize: 20,
    }
});