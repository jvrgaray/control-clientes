import { ConfiguracionServicio } from './../../servicios/configuracion.service';
import { Router } from '@angular/router';
import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  mostrarRegistro: boolean;
  permitirRegistro: boolean;

  constructor(private loginService: LoginService, private router: Router, private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    });
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  registrarse() {
    this.router.navigate(['/registrarse']);
  }

}
