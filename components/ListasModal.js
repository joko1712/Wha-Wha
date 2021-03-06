import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import Colors from '../Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';
import Feather from 'react-native-vector-icons/Feather';


export default class ListasModal extends React.Component {
  state = {
     newLista: "",
     end: '',
     started: '',
     name: '',
     newPrice:'',
     active: true,
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
         newLista: e.value[0].toUpperCase()
      });
   };

   _startRecognizing = async () => {
      this.setState({
         newLista: '',
         started: '',
         end: '',
         active: false
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
         newLista: '',
         end: '',
         active: true
      });
   };

  toggleListaBought = (index) => {
     let list = this.props.list;
     list.lista[index].bought = !list.lista[index].bought;

     this.props.updateList(list);
  };

  addList = () => {
     let list = this.props.list;

     if (!list.lista.some((lista) => lista.title === this.state.newLista)) {
        list.lista.push({ title: this.state.newLista, bought: false, price:''});
        this.props.updateList(list);
        this.setState({active: true});
      }

     this.setState({ newLista: "" });
     Keyboard.dismiss();
   };

   addPrice = (index) =>{
      let list = this.props.list;
      list.lista[index].price=this.state.newPrice;
      this.props.updateList(list);
      this.setState({ newPrice: '' });
   };
  
  deleteItem = (index) => {
     let list = this.props.list;
     list.lista.splice(index, 1);

     this.props.updateList(list);
  };

  renderList = (list, index) => {
     return (
        <KeyboardAvoidingView behavior='padding'>
           <SafeAreaView style={styles.listaContainer}>
               <TouchableOpacity onPress={() => this.toggleListaBought(index)}>
                  <Ionicons
                     name={list.bought ? "ios-square" : "ios-square-outline"}
                     size={24}
                     color={Colors.gray}
                     style={{ width: 32 }}
                  />
               </TouchableOpacity>

               <Text numberOfLines={1}
                  style={[
                     styles.list,
                     {
                        textDecorationLine: list.bought ? "line-through" : "none",
                        color: list.bought ? Colors.gray : Colors.white,
                     },
                  ]}>
                  {list.title}
               </Text>
                  <Text style={{color:Colors.white,position:'absolute', right: 100, bottom:22, width: 100 }}>Preço:</Text>
               <TextInput
                  style={[
                     styles.input,
                     {position:'absolute', right: 30,bottom: 5, width: 100}
                  ]}
                     onChangeText={(text) => this.setState({ newPrice: text })}
                     placeholder={list.price}
                     placeholderTextColor={Colors.white}
                     keyboardType='numeric'
                     removeClippedSubviews={false}
                     keyboardDismissMode='none'
                  /> 
                  <TouchableOpacity 
                     onPress={() => this.addPrice(index)}
                     style={[
                     styles.list,
                     {position:'absolute', right: -30,bottom: 18, width: 100}
                  ]}>
                        <AntDesign name='pluscircleo' size={25} color={Colors.green} />
                  </TouchableOpacity>

               <View style={{ flexDirection: "row", flex: 1 }}>
                  <TouchableOpacity
                     onPress={() => this.deleteItem(index)}
                     style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: 10,
                        bottom: -15,
                     }}>
                        <AntDesign name='delete' size={25} color={Colors.red} />
                  </TouchableOpacity>
               </View>
            </SafeAreaView>
         </KeyboardAvoidingView>
     );
  };

  render() {
     const list = this.props.list;
     const listaCount = list.lista.length;
     const boughtCount = list.lista.filter((Listas) => Listas.bought).length;

     return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
           <SafeAreaView style={styles.container}>
              <TouchableOpacity
                 style={{
                    position: "absolute",
                    top: "4%",
                    right: 32,
                    zIndex: 10,
                 }}
                 onPress={this.props.closeModal}>
                  <AntDesign name='close' size={45} color={Colors.white} />
              </TouchableOpacity>

              <View
                 style={[
                    styles.section,
                    styles.header,
                    { borderBottomColor: list.color },
                 ]}>
                 <View style={{left:10}}>
                    <Text numberOfLines={1} style={styles.title}>{list.name}</Text>
                    <Text style={styles.taskCount}>
                       {boughtCount} of {listaCount} itens
                    </Text>
                 </View>
              </View>

              <View style={[styles.section, { flex: 3, marginVertical: 5 }]}>
                 <FlatList
                    data={list.lista}
                    renderItem={({ item, index }) =>
                       this.renderList(item, index)
                    }
                    keyExtractor={(item) => item.title}
                    removeClippedSubviews={false}
                 />
              </View>

              <Text style={styles.result}>{this.state.name}</Text>
               <TouchableHighlight style={this.state.active? styles.button: styles.buttonD}  onPress={this._startRecognizing}>
                  <Feather name='mic' size={50} color={list.color} />
               </TouchableHighlight>

              <View style={[styles.section, styles.footer]}>
                  <TouchableHighlight style={styles.destroy} onPress={this._destroyRecognizer}>
                     <Text>Limpar</Text>
                  </TouchableHighlight>
                 <TextInput
                    style={[styles.input, { borderColor: list.color }]}
                    onChangeText={(text) => this.setState({ newLista: text })}
                    value={this.state.newLista}
                    placeholder='Nome do item?'
                    placeholderTextColor={Colors.white}
                 />
                 <TouchableOpacity
                    style={[styles.addList, { backgroundColor: list.color }]}
                    onPress={() => this.addList()}>
                     <AntDesign name='plus' size={15} />
                 </TouchableOpacity>
              </View>
           </SafeAreaView>
        </KeyboardAvoidingView>
     );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: Colors.bBlack
  },
  section: {
     alignSelf: "stretch",
  },
  header: {
     justifyContent: "flex-end",
     marginLeft: 35,
     borderBottomWidth: 3,
     paddingBottom: 10,
     paddingTop: 30,
  },
  title: {
     fontSize: 30,
     color: Colors.white,
     fontWeight: "bold",
     width: 280
  },
  listaCount: {
     marginTop: 4,
     marginBottom: 16,
     color: Colors.gray,
     fontWeight: "600",
  },
  footer: {
     paddingHorizontal: 32,
     flexDirection: "row",
     alignItems: "center",
     paddingVertical: 20,
  },
  input: {
     flex: 1,
     height: 48,
     borderWidth: StyleSheet.hairlineWidth,
     borderRadius: 6,
     marginRight: 8,
     marginLeft: 5,
     paddingHorizontal: 3,
     color: Colors.white
  },
  addList: {
     borderRadius: 4,
     padding: 16,
     alignItems: "center",
     justifyContent: "center",
  },
  listaContainer: {
     paddingVertical: 20,
     flexDirection: "row",
     alignItems: "center",
     paddingLeft: 30,
  },
  list: {
     color: Colors.black,
     fontWeight: "700",
     fontSize: 16,
     width: 120
  },
  welcome: {
     fontSize: 20,
     textAlign: "center",
     margin: 10,
  },
  instructions: {
     textAlign: "center",
     color: "#333333",
     marginBottom: 5,
  },
  container1: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#F5FCFF",
   },
   destroy: {
      height: 50,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.red,
      width: 55,
      marginRight: 5
  },
  button:{
      position: 'absolute',
      right: 30,
      bottom: 80
  },
  buttonD:{
      position: 'absolute',
      right: -1000000,
      bottom: 80
  },
  result:{
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 20,
      marginVertical: 10,
      fontWeight: '900',
      paddingTop: 5
   },
   taskCount:{
      fontSize: 13,
     color: Colors.gray,
     fontWeight: "100",
     left: 5
   }

});
