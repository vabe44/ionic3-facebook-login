import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import firebase from 'firebase';

@Injectable()
export class AuthService {

    constructor(private http: Http) {}

    saveUser(result: any) {
        const facebookProfile = result.additionalUserInfo.profile;
        return this.http.put('https://fir-demo-78788.firebaseio.com/users/' + facebookProfile.id + '.json', result.additionalUserInfo.profile)
            .map((response: Response) => response.json());
    }

    saveOrGetUser(result: any) {
        const facebookProfile = result.additionalUserInfo.profile;
        if (result.additionalUserInfo.isNewUser) {
            return this.http.put('https://fir-demo-78788.firebaseio.com/users/' + facebookProfile.id + '.json', result.additionalUserInfo.profile)
                .map((response: Response) => response.json());
        } else {
            return this.http.get('https://fir-demo-78788.firebaseio.com/users/' + facebookProfile.id + '.json')
                .map((response: Response) => response.json());
        }
    }

    saveToFirebase(result) {
        return this.http.put('https://fir-demo-78788.firebaseio.com/users/kaki.json', result)
            .map((response: Response) => response.json());
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }

    getUserProfile(facebookProfileId: string) {
        return this.http.get('https://fir-demo-78788.firebaseio.com/users/' + facebookProfileId + '.json');
    }
}