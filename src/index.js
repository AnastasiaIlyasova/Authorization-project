import "../style.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDNZfFTkP6Zk5HsVQxW6vJCrf98UnDLvqo",
    authDomain: "auth4-15eb4.firebaseapp.com",
    projectId: "auth4-15eb4",
    storageBucket: "auth4-15eb4.appspot.com",
    messagingSenderId: "804391724083",
    appId: "1:804391724083:web:ee022aeccf3f4c3b1eef46"
};

const app = initializeApp(firebaseConfig);

import { getAuth, createUserWithEmailAndPassword,  sendEmailVerification, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from "firebase/auth";

const auth = getAuth(app);
let btn = document.getElementById("btn");
let login =document.getElementById("login");
let passwordEl = document.getElementById("password");
const email = login.value
const password = passwordEl.value
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
   const user = userCredential.user;
   console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

const createAccount = async () =>{
    let btn = document.getElementById("btn");
    let login =document.getElementById("login");
    let passwordEl = document.getElementById("password");
    const email = login.value
    const password = passwordEl.value

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user)
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Email verification sent')
            localStorage.setItem('token', 'userCredential.user.accessToken');
                window.location.href = '../dist/redirect.html';
            });
    }
   catch (error){
        console.log(error)
    }
}
btn.addEventListener('click', createAccount)


//google auth
let googleBtn = document.getElementById("googleBtn");
const provider = new GoogleAuthProvider(app);

googleBtn.addEventListener('click', (e)=>{
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info and redirect.
            const user = result.user;
            window.location.href = '../dist/redirect.html';

        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
})


/*
    const hideBtn = document.querySelector('.hide')
    const inputHide =document.querySelector('.passwordInput')

function showPassword(){
 if(inputHide.getAttribute('type')=== 'password'){
             inputHide.setAttribute('type', 'text')
         }else{
         inputHide.setAttribute('type', 'password')
         }
   }

hideBtn.addEventListener('click', showPassword)
*/