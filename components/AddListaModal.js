import React,{useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Colors from '../Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Voice from '@react-native-voice/voice';

export default class AddListaModal extends React.Component {

  backgroundColors = [
     "#7400B8",
     "#8B5CD6",
     "#5E60CE",
     "#5390D9",
     "#4EA8DE",
     "#48BFE3",
     "#56CFE1",
     "#64DFDF",
     "#72EFDD",
     "#80FFDB",
   ];

  state = {
      name: "",
      color: this.backgroundColors[0],
      end: '',
      started: '',
   };

   constructor(props) {
      super(props);
      Voice.onSpeechStart = this.onSpeechStart;
      Voice.onSpeechEnd = this.onSpeechEnd;
      Voice.onSpeechResults = this.onSpeechResults;
   }
  
   componentWillUnmount() {
      Voice.destroy().then(Voice.removeAllListeners);
   }
  
   onSpeechStart = (e) => {
      console.log('onSpeechStart: ', e);
      this.setState({
        started: '√',
      });
   };
  
   onSpeechEnd = (e) => {
      console.log('onSpeechEnd: ', e);
      this.setState({
        end: '√',
      });
   };
  
   onSpeechResults = (e) => {
      console.log('onSpeechResults: ', e);
      this.setState({
        name: e.value[0].toUpperCase()
      });
   };
  
   _startRecognizing = async () => {
      this.setState({
        name: '',
        started: '',
        end: '',
      });
  
      try {
        await Voice.start('pt-PT');
      } catch (e) {
        console.error(e);
      }
   };
  
   _destroyRecognizer = async () => {
      try {
        await Voice.destroy();
      } catch (e) {
        console.error(e);
      }
      this.setState({
        started: '',
        name: '',
        end: '',
      });
   };

   createLista = () => {
     const { name, color } = this.state;

     const list = { name, color };

     this.props.addList(list);

     this.setState({ name: "" });
     this.props.closeModal();
   };

  renderColors() {
     return this.backgroundColors.map((color) => {
        return (
           <TouchableOpacity
              key={color}
              style={[styles.colorSelect, { backgroundColor: color }]}
              onPress={() => this.setState({ color })}
           />
        );
     });
  };

  render() {
     return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
           <TouchableOpacity
              style={{ position: "absolute", top: 60, right: 32 }}
              onPress={this.props.closeModal}>
               <AntDesign name='close' size={45} color={Colors.black} />
           </TouchableOpacity>

           <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
              <Text style={styles.title}>Create a List</Text>

              <View style={[styles.section, styles.footer]}>
                 <TextInput
                    style={[styles.input]}
                    placeholder='ListName?'
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                 />
                  <TouchableHighlight style={styles.button} onPress={this._startRecognizing}>
                     <Feather name='mic' size={50} color={Colors.amethyst} />
                  </TouchableHighlight>
                 <TouchableOpacity
                    style={{
                       borderRadius: 4,
                       padding: 16,
                       position: "absolute",
                       right: -30,
                    }}>
                 </TouchableOpacity>
              </View>

              <View
                 style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 12,
                 }}>
                 {this.renderColors()}
              </View>

               <TouchableHighlight style={styles.destroy} onPress={this._destroyRecognizer}>
                  <Text>Destroy</Text>
               </TouchableHighlight>

              <TouchableOpacity
                 style={[styles.create, { backgroundColor: this.state.color }]}
                 onPress={this.createLista}>
                 <Text style={{ color: Colors.white, fontWeight: "600" }}>
                    Create!
                 </Text>
              </TouchableOpacity>
           </View>
        </KeyboardAvoidingView>
     );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
  },
  title: {
     fontSize: 28,
     fontWeight: "900",
     color: Colors.black,
     alignSelf: "center",
     marginBottom: 16,
  },
  input: {
     flex: 1,
     height: 48,
     borderWidth: StyleSheet.hairlineWidth,
     borderRadius: 6,
     marginRight: 8,
     paddingHorizontal: 3,
     fontSize: 18,
     position: "absolute",
     left: 0,
     width: "90%",
  },
  create: {
     marginTop: 24,
     height: 50,
     borderRadius: 6,
     alignItems: "center",
     justifyContent: "center",
  },
  colorSelect: {
     width: 30,
     height: 30,
     borderRadius: 4,
  },
  section: {
     alignSelf: "stretch",
  },
  footer: {
     paddingHorizontal: 5,
     flexDirection: "row",
     alignItems: "center",
     paddingVertical: 25,
  },
  destroy: {
      marginTop: 25,
      height: 50,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.red
  },
  button:{
      position: 'absolute',
      right: -15,
  },
  result:{
   alignSelf: 'center',
   justifyContent: 'center',
   fontSize: 20,
   marginVertical: 10,
   fontWeight: '900',
   paddingTop: 5
  }
});
