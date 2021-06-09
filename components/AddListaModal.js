import React,{useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Voz from './Voz';
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
  }

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
                 />
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
              <TouchableOpacity
                 style={[styles.create, { backgroundColor: this.state.color }]}
                 onPress={this.createLista}>
                 <Text style={{ color: Colors.white, fontWeight: "600" }}>
                    Create!
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]}>
                 <Voz />
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
     height: 250,
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
});
