import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user_id: string;

  constructor(private fireAuth: AngularFireAuth) { }

  registerUser(value) {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then((user)=>{
      if(user){
        console.log(user);
        this.user_id = user['user'].uid;

        firebase.database().ref('user/' + this.user_id).set({
          namadepan: value.namadepan,
          namabelakang: value.namabelakang,
          nim: value.nim,
          id:this.user_id,
          foto: 'https://firebasestorage.googleapis.com/v0/b/ionic-uas-9bf64.appspot.com/o/user%2Ffoto%2Fdefault.png?alt=media&token=40546258-98a1-424b-ab25-b0374e32644b'
        })
      }
    })
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err=> reject(err)
        );
    });
  }

  logoutUser() {
    return new Promise((resolve,reject) => {
      if(this.fireAuth.currentUser) {
        this.fireAuth.signOut()
          .then(() => {
            console.log('Log Out');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  userDetails(){
    return this.fireAuth.user;
  }
}
