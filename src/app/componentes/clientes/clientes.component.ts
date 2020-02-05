import { ClienteServicio } from './../../servicios/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  constructor(private clientesServicio: ClienteServicio,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;

    if (this.clientes != null) {
      saldoTotal = this.clientes.reduce((total, actual) => total + actual.saldo, 0);
    }
    return saldoTotal;
  }

  agregar({ value, valid }: { value: Cliente, valid: boolean }) {
    if(!valid){
      this.flashMessage.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //agregar el nuevo cliente
    }
  }
}
