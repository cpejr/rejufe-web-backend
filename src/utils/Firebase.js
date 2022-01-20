const firebase = require('firebase/app');
require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

firebase.initializeApp(firebaseConfig);

module.exports = {
  async createNewUser(email, password) {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return result.user.uid;
  },

  async login(user, password) {
    const email = await this.findOne({ user });
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    return result.user.uid;
  },
};