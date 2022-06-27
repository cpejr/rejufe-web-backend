const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser
} = require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = {
  async createNewUser(email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    return result.user.uid;
  },

  async deleteUser(id) {
    const user = auth.currentUser;
    try {
      const result = await deleteUser(user);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return result.user.uid;
  },

  async firebaseChangeUserPassword(email) {
    return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, email)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
};

