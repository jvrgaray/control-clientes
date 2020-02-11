import { ClienteServicio } from './../../servicios/cliente.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

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

  @ViewChild('clienteForm', { static: false }) clienteForm: NgForm;
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;

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
    if (!valid) {
      this.flashMessage.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this._cerrarModal();
    }
  }

  _cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
