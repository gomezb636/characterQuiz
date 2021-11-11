
(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  const firebaseConfig = {
    apiKey: "AIzaSyDrU1uGmb8PxF--jjBOwOf2DrKejxMaRlY",
    authDomain: "characterquiz-546a1.firebaseapp.com",
    databaseURL: "https://characterquiz-546a1-default-rtdb.firebaseio.com",
    projectId: "characterquiz-546a1",
    storageBucket: "characterquiz-546a1.appspot.com",
    messagingSenderId: "265614022304",
    appId: "1:265614022304:web:d099520c7c92eaee8adbc5",
    measurementId: "G-95SY446PM7"
  };

  class FireBaseDataStore {
      constructor() {
          console.log('running the FireBaseDataStore function');
            firebase.initializeApp(firebaseConfig);
        // firebase.initializeApp(App.FirebaseConfig.firebaseConfig);
        this.firestore = firebase.firestore();
      }

      async add(key, val) {
        alert("Question Successfully Added!");

        console.log('firebase add  ');
        console.log("values: " + val);
        var collection = firebase.firestore().collection('QandAs');
        return collection.add(val);

        // const docRef = this.firestore.doc(`QandAs`);
        // return docRef.set(val); // i realize that could just use .add, but wanted to try .set instead.
        // return this.firestore.doc(`orders/${key}`).set(val);
      }
      async get(key, cb)  { 
          const docRef = this.firestore.collection(`QandAs`);
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          return await snapshot.docs.map(e => e.data());
      }
      async getAll(cb)    { 
          const docRef = this.firestore.collection(`QandAs`);
          const snapshot = await docRef.get();
          console.log("snapshot: " + snapshot);

          return await snapshot.docs.map(e => e.data());  
      }


      async remove(email)   { 
          const docRef = await this.firestore.collection(`QandAs`);
          const batch = this.firestore.batch();
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          snapshot.forEach(doc => {
              batch.delete(doc.ref);
          });
          await batch.commit();
      }
  }
  App.FireBaseDataStore = FireBaseDataStore;
  window.App = App;

})(window);