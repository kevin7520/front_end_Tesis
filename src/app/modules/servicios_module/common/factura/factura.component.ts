import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Almacenes } from '../../models/almacenes.model';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { crearFacturaRequest } from '../../models/request/crearFacturaRequest';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  @Output() guardarFactura= new EventEmitter;
  constructor(private servicio: ServiciosService, private notificationService: NotificationService) { }

  almacenes: Almacenes[] = [];
  fechaCompra = new Date();
  minDate = new Date();
  numeroFactura = "";
  ngOnInit() {
    this.obtenerAlmacenes();
  }

  almacen = 0;
  obtenerAlmacenes() {
    this.servicio.obtenerAlmacenes().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.almacenes = dataResponse.data;
      }
      else {
        this.notificationService.showError("No se pudieron obtener los almacesnes");
      }
    }, err => {
       this.notificationService.showError("No se pudieron obtener los almacesnes");
    })
  }

  fechaComprarFormat() : string {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const año = fechaActual.getFullYear();
    const fechaCompra = `${dia}/${mes}/${año}`;
    return fechaCompra;
  }
  NumeroFacturaFormat() : string {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const año = fechaActual.getFullYear();
    const hora = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
    const numeroFactura = `${dia}${mes}${año}${hora}${minutos}${segundos}`;
    return numeroFactura;
  }

  guardarFacturaMetodo() {
    const criteria: crearFacturaRequest = {
      fechaCompra: this.fechaCompra,
      numeroFactura: this.numeroFactura
    }
    this.servicio.crearFactura(criteria).subscribe(dataresponse => {
      if (dataresponse.codigo == "200") {
        const datosId = {
          idAlmacen: this.almacen,
          idFactura: dataresponse.data.idFactura,
        }
        this.guardarFactura.emit(datosId);
      }
      else {
        this.notificationService.showError("Erro al crear la factura intentalo nuevamente.")
      }
    }, err => {
       this.notificationService.showError("Erro al crear la factura intentalo nuevamente.")
    })
  }

}
