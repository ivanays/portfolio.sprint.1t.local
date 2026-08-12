"use strict"

//---------------------------------------------------------------
// Конфигурация FireBase

    const firebaseConfig = {
        apiKey: "AIzaSyDE2MXAR_g5vraXV5p8Mos7kQcLHB4xw30",
        authDomain: "petdoc-origin.firebaseapp.com",
        projectId: "petdoc-origin",
        storageBucket: "petdoc-origin.appspot.com",
        messagingSenderId: "794161161894",
        appId: "1:794161161894:web:f61cce3c193d17353e3667",
        measurementId: "G-KKBKMHD83G",
    };
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.firestore();


//-------------------------------------------------------------------