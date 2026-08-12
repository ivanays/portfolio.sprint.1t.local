// Карта соответствия URL загруженного файла - режиму
export const C_PATH_TO_MODE = {
    "index.html": "signup",
    "login.html": "signin",
    "users.html": "main",
};

const firebaseConfig = {
    apiKey: "AIzaSyBGQy6Hl4MByi3gMkr-Yn-7heRYKGCht04",
    authDomain: "petdoc1-72554.firebaseapp.com",
    projectId: "petdoc1-72554",
    storageBucket: "petdoc1-72554.appspot.com",
    messagingSenderId: "997805878182",
    appId: "1:997805878182:web:8ac4e5cfcf39bc5b5efd67",
    measurementId: "G-WYG18FM5PD",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
