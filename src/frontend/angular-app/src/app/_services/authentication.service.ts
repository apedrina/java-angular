import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loginEndpoint = 'api/auth/signin'
    public currentUser: Observable<User>;

    constructor(public http: HttpClient) {

    }

    public async login(username: string, password: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        console.log(`${environment.apiUrl}/${this.loginEndpoint}`)
        return this.http.post(`${environment.apiUrl}/${this.loginEndpoint}`, JSON.stringify({ username: username, password: password }), {
            observe: 'response',
            headers: headers,

        }).toPromise();

    }

    logout() {
        localStorage.removeItem('currentUser');

    }

}