import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import {BackendService} from 'src/app/_services/import.service';
import {TokenStorageService} from 'src/app/_services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('button') button: ElementRef<HTMLElement>;

    loginForm: FormGroup;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private router: Router, private http: HttpClient, private lrdb: BackendService,
        private authService: AuthenticationService, private tokenStorage: TokenStorageService,
        private readonly fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: [],
            password: []

        });
        this.init()

    }

    init() {

    }

    closeModal() {
        this.errorMessage = null
    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }

    }

    onSubmit(): void {
        let user = this.loginForm.get('username').value;
        let password = this.loginForm.get('password').value;
        this.authService.login(user, password).then(
            (data) => {
                console.log('data:: ' + JSON.stringify(data))
                let token = data.body['accessToken'];
                this.tokenStorage.saveToken(token);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                this.router.navigate(['/dashboard']);
            },
            err => {
                let el: HTMLElement = this.button.nativeElement;
                el.click();
                this.errorMessage = err.message;
                this.isLoginFailed = true;
            }
        );
    }


    reloadPage(): void {
        window.location.reload();

    }

}