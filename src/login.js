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

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let btnSignin = document.getElementById("btn--signin");
const auth = getAuth(app);


const loginEmailPassword = async () => {
    let emailIn =document.getElementById("email-in");
    let passwordIn = document.getElementById("password-in");
    const emailValue = emailIn.value
    const passwordValue = passwordIn.value

    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        console.log(userCredential.user)
        console.log(userCredential.user.accessToken)
        alert(`You are signed with email: ${emailValue}`)
        localStorage.setItem('token', 'userCredential.user.accessToken');
        window.location.href = 'Authorization4/dist/redirect.html';
    }
    catch (e){
        switch (e.code){
            case 'auth/user-not-found':
                alert("User not found")
                break
            case 'auth/wrong-password':
                alert("Wrong password")
                break
            default:
                alert("Something wrong")
        }

    }
}
btnSignin.addEventListener("click", loginEmailPassword)

