import { LoginService } from './../../servicios/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private flashMessages: FlashMessagesService, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  registro(){
    this.loginService.registrarse(this.email, this.password)
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }
}
