import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router }                                          from '@angular/router';
import * as _                                              from 'lodash';
import { UserService }                                     from '../../shared/services/user-service';
import { Http, Response, Headers, RequestOptions }         from '@angular/http';

@Component({
    selector: 'login',
    templateUrl: './login.component.pug',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() selectedTab;
    @Output() loginSuccess = new EventEmitter();
    
    private isRegisterSelected;
    private isLoginSelected;
    private user: any = {};
    private username;
    private password;
    private isMobile : boolean = false;
    private countryCode = '+91';

    constructor(
        private router: Router,
        private userService : UserService,
        private http:    Http
    ) {
    }

    ngOnInit() {
        $('ul.tabs').tabs();
    }
    
    ngOnChanges(changes: SimpleChanges) {

        let chng = changes['selectedTab'];
        let curr =  chng.currentValue;

        if(curr === "loginPane") {

            this.isLoginSelected = true;
            this.isRegisterSelected = false;
            $('ul.tabs').tabs('select_tab','loginPane');
        } else if (curr === "registerPane") {
                this.isRegisterSelected = true;
                this.isLoginSelected = false;
                $('ul.tabs').tabs('select_tab','registerPane');
        }
    }
    
    formatUserName() {
        if (this.username && this.username.match(/^\d+$/)) {
            this.isMobile = true;
            this.countryCode = '+91';
        }else {
            this.isMobile = false;
        }
    }


    login() {
        let userDetails : any = {};
        this.isMobile ? userDetails = this.countryCode + this.username : userDetails = this.username;
        // Form the payload for login
        const payload = {
            'username':    userDetails,
            'password':    this.password
        }
        this.userService.login(payload).subscribe((response) => {
            if (_.get(response, 'data.status.code') === 200) {
                this.loginSuccess.emit(response);
            }
        });
    }
    
    register(_user) {
        alert('This is under development');
    }

}
