const firebase = require('firebase/app');
require('firebase/auth');
// const admin = require('firebase-admin');

// function initializeFirebase() {
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}
//initialize firebase  
if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
    // });
  } catch (err) {
    console.error(err); //eslint-disable-line
  }
}
// var db = firebase.firestore();
// };

module.exports = {
  async createNewUser(email, password) {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return result.user.uid;
  },

  async login(email, password) {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return result.user.uid;
  }
};


// module.exports = {
//   // async createNewUser(email, password, user, type) {
//   //   const result = await admin.auth().createUser({
//   //     email,
//   //     password,
//   //     displayName: type,
//   //   });

//   async createUserWithEmailAndPassword(email , password){
//     const result = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password);

//     return result.user.uid;
//   },

//   async login(email, password) {
//     const email = await this.findOne({ user });
//     const result = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)

//     return result.user;
//   },
// };