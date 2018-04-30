import { AuthService } from './../../services/auth';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  user: any;

  constructor(public navCtrl: NavController, private fire: AngularFireAuth, private authService: AuthService) {
    this.fire.auth.getRedirectResult()
    .then(result => {
      if (result.user) {
        console.log(result);
        this.authService.saveOrGetUser(result).subscribe(response => {
          console.log(response)
          this.user = response;
        });
        localStorage.setItem('fbAccessToken', result.credential.accessToken);
      }
    })
    .catch(error => console.log(error));
  }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  logoutOfFacebook() {
    this.fire.auth.signOut();
    localStorage.removeItem('fbAccessToken');
    this.user = null;
  }

  firebaseTest() {
    this.authService.saveToFirebase('420').subscribe(response => console.log(response));
  }

  authTest() {
    console.log(this.authService.getActiveUser());
  }
}
