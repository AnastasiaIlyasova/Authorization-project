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
let btnUp = document.getElementById("btn");

btnUp.addEventListener('click', (e)=>{
    let login =document.getElementById("login");
    let passwordEl = document.getElementById("password");
    const email = login.value
    const password = passwordEl.value
    let loader = document.querySelector('.loader')
    let bg = document.querySelector('.background')

    loader.style.display = 'block'
    bg.classList.add('bg-loader');
    console.log(password)
    console.log(email)

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=> {
            sendEmailVerification(auth.currentUser)
                .then(()=> {
                    alert('Email verification was sent')
                    localStorage.setItem('token', 'userCredential.user.accessToken')
                    window.location.href = 'redirect.html'})
            const user = userCredentials.user;
            console.log(user)
        })
        .catch ((error)=>{
            loader.style.display = 'none'
            bg.classList.remove('bg-loader');
            console.log(error)

            switch (error.code){
                case 'auth/weak-password':
                    alert("Weak password, use more than 5 symbols")
                    break
                case 'auth/invalid-email':
                    alert("Invalid email")
                    break
                case 'auth/email-already-in-use':
                    alert("Email already in use")
                    break
                default:
                    alert("Something wrong")
            }
        })
})

//google auth
let googleBtn = document.getElementById("googleBtn");
const provider = new GoogleAuthProvider(app);

googleBtn.addEventListener('click', (e)=>{
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location.href = 'redirect.html';
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
})

//hide password
const hideBtn = document.getElementById('hide')
const inputHide =document.getElementById('password')

function showPassword(){
    if(inputHide.getAttribute('type')=== 'text'){
        inputHide.setAttribute('type', 'password')
    }else{
        inputHide.setAttribute('type', 'text')
    }
}
hideBtn.addEventListener('click', showPassword)