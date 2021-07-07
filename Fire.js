import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const firestoreConfig = {
   apiKey: "AIzaSyALTdavPNQReVJNWyc2aF8DfexzxzDoXB0",
   authDomain: "projetofinal-e1147.firebaseapp.com",
   projectId: "projetofinal-e1147",
   storageBucket: "projetofinal-e1147.appspot.com",
   messagingSenderId: "546669005614",
   appId: "1:546669005614:web:1b06c375565e04b4c888bf",
   measurementId: "G-KLJBEWBR3S",
};

class Fire {
   constructor(callback) {
      this.init(callback);
   }

   init(callback) {
      if (!firestore.length) {
         firestore.initializeApp(firestoreConfig);
      }

      auth().onAuthStateChanged((user) => {
         if (user) {
            callback(null, user);
         }
      })
   }

   getLists(callback) {
      let ref = this.ref

      this.unsubscribe = ref.onSnapshot((snapshot) => {
         lists = [];

         snapshot.forEach((doc) => {
            lists.push({ id: doc.id, ...doc.data() });
         });

         callback(lists);
      });
   }

   addList(list) {
      let ref = this.ref;

      ref.add(list);
   }

   deleteList(list) {
      let ref = this.ref;

      ref.doc(list.id).delete();
   }

   updateList(list) {
      let ref = this.ref;

      ref.doc(list.id).update(list);
   }

   get userId() {
      return auth().currentUser.uid;
   }

   get ref() {
      return firestore()
         .collection("users")
         .doc(this.userId)
         .collection("lists");
   }

   detach() {
      this.unsubscribe();
   }
}

export default Fire;
