import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { tecnicos } from '../../models/response/tecnicosResponse';
import { NotificationService } from 'src/app/shared/services/notificacion.service';

@Component({
  selector: 'app-servicio-instalacion',
  templateUrl: './servicio-instalacion.component.html',
  styleUrls: ['./servicio-instalacion.component.scss']
})
export class ServicioInstalacionComponent implements OnInit {

  viewAgregarCliente: boolean = false;
  @Output() _salirEvent = new EventEmitter();
  constructor(private _service: ServiciosService, private notificationService: NotificationService) { }

  tipoInstalacion: number = 1;
  displayedColumns: string[] = 
  [
    'id_servicio', 
    'nombre_cliente', 
    'telefono_cliente', 
    'dirreccion_cliente', 
    'numero_solicitud', 
    'fecha_coordinacion', 
    'nombre_tecnico',
    'estado',
    'acciones'
    ];
  
  numeroPaso = 1;
  
  dataSource: any[] = [];

  tecnicos: tecnicos[] = [];
  
  ngOnInit() {
    this.obtenerTecnicos();
  }

  salir() {
    this._salirEvent.emit();
  }

  cambiarInstalacion(id: number) {
    this.tipoInstalacion = id;
  }

  obtenerTecnicos() {
    this._service.getTecnicos().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        debugger;
        this.tecnicos = dataResponse.data.filter(data => data.estadoTecnico.idEstado == 1);
      }
      else {
        this.notificationService.showError("Error al cargar los técnicos")
      }
    }, err => {
      this.notificationService.showError("Ocurrió un error al recuperar los técnicos. Intentalo más tarde")
    })
  }

  obtenerCliente(event: any) {
    this.numeroPaso = 1;
  }



}
