import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Servicios } from '../../models/servicio.mode';
import { MatPaginator } from '@angular/material/paginator';
import { tecnicos } from '../../models/tecnico.model';
import { EstadoServicioDto } from '../../models/estadoServicio';
import { CrearServiciosRequest } from '../../models/request/crearServiciosRequest';
import { EditarServicioRequest } from '../../models/request/editarServicioRequest';

@Component({
  selector: 'app-servicio-garantia',
  templateUrl: './servicio-garantia.component.html',
  styleUrls: ['./servicio-garantia.component.scss']
})
export class ServicioGarantiaComponent implements OnInit, AfterViewInit  {

  viewAgregarCliente: boolean = false;
  @Output() _salirEvent = new EventEmitter();
  constructor(private _service: ServiciosService, private notificationService: NotificationService) { }

  tipoInstalacion: number = 5;
  displayedColumns: string[] = 
    [
    'numero_solicitud', 
    'nombre_cliente', 
    'telefono_cliente', 
    'dirreccion_cliente', 
    'fecha_coordinacion', 
    'nombre_tecnico',
    'estado',
    'acciones'
    ];
  
  numeroPaso = 1;

  id_servicioTemp: number = 0;

  servicios: Servicios[] = [];

  dataSource = new MatTableDataSource<Servicios>(this.servicios);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tecnicos: tecnicos[] = [];
  estadosServicio: EstadoServicioDto[] = [];
  
  ngOnInit() {
    this.obtenerTecnicos();
    this.ObtenerServicios();
    this.obtenerEstadosServicios();
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  salir() {
    this._salirEvent.emit();
  }

  cambiarInstalacion(id: number) {
    this.tipoInstalacion = id;
    this.ObtenerServicios();
  }

  obtenerTecnicos() {
    this._service.getTecnicos().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.tecnicos = dataResponse.data.filter(data => data.estadoTecnico.idEstado == 1);
      }
      else {
        this.notificationService.showError("Error al cargar los técnicos")
      }
    }, err => {
      this.notificationService.showError("Ocurrió un error al recuperar los técnicos. Intentalo más tarde")
    })
  }

  obtenerEstadosServicios() {
    this._service.obtenerEstadosServicios().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.estadosServicio = [...dataResponse.data];
      }
      else {
        this.notificationService.showError("Error al obtener los estados del servicio");
      }
    }, err => {
      this.notificationService.showError("Error al obtener los estados del servicio");
    })
  }

  obtenerCliente(event: any) {
    const criteria: CrearServiciosRequest = {
      idCliente: event.idCliente,
      idTecnico: null,
      idTipoServicio: this.tipoInstalacion,
      idEstadoServicio: 1,
      fechaTentativaAtencion: new Date(),
      valor: 0,
      productos: []
    }
    this._service.crearServicio(criteria).subscribe(dataResponse => {
      if (dataResponse.codigo == '200') {
        this.notificationService.showSuccess("Solicitud creada exitosamente.");
        this.ObtenerServicios();
      }
      else {
        this.notificationService.showError("Error al crear la solicitud.")
      }
    }, err => {
      this.notificationService.showError("Error al crear la solicitud. Intentolo más tarde")
    });
    this.numeroPaso = 1;
  }

  ObtenerServicios() {
    this._service.obtenerServicios().subscribe((dataResponse: { codigo: string; data: any[]; }) => {
      if (dataResponse.codigo == "200") {
        this.servicios = [...dataResponse.data.filter(data=> data.tipoServicio.idTipoServicio == this.tipoInstalacion)];
        this.dataSource = new MatTableDataSource<Servicios>(this.servicios);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.notificationService.showError("Hubo errores al cargar los servicios. Intentalo más tarde")
      }
    }, err => {
      this.notificationService.showError("Hubo errores al cargar los servicios. Intentalo más tarde")
    });
  }

  servicioSeleccionado!: Servicios;
  editarServicio(id: number) {
    this.servicioSeleccionado = this.servicios.find(data => data.idServicio = id)!;
    this.numeroPaso = 3
  }


  eliminarServicioCambiarEstado(id: number) {
    const servicioEliminar = this.servicios.find(data => data.idServicio = id)!;
    const criteria: EditarServicioRequest = {
      idCliente: servicioEliminar.cliente.idCliente,
      idTecnico: servicioEliminar.tecnico?.idTecnico!,
      idTipoServicio: servicioEliminar.tipoServicio.idTipoServicio,
      idEstadoServicio: 4,
      valor: servicioEliminar.valor,
      productos: servicioEliminar.productos.map(data => {
        return {
            idProducto: data.idProducto,
            valor: data.valor,
            serie: data.serie
        }
      }),
      repuestoDto: servicioEliminar.repuestos,
      fechaTentativaAtencion: servicioEliminar.fechaSolicitudServicio
    };
    this._service.editarServicio(criteria, servicioEliminar.idServicio).subscribe((DataResponse: { codigo: string; }) => {
      if (DataResponse.codigo == "200") {
        this.notificationService.showSuccess("Se cambio de estado cerrado correctamente");
        this.ObtenerServicios();
      }
      else {
        this.notificationService.showSuccess("Error al cerrar el servicio");
      }
    }, err => {
      this.notificationService.showSuccess("Error al cerrar el servicio. Intentalo más tarde");
    })
  }

  nombreInput = "";
  estado= 0;
  tecnico = 0;

  filtrar() {
    let dataTemp = [...this.servicios];
    if (this.nombreInput != "") {
      dataTemp = dataTemp.filter(data=> data.cliente.nombres.toLowerCase().includes(this.nombreInput) )
    }
    if (this.tecnico != 0) {
      dataTemp = dataTemp.filter(data=> data.tecnico?.idTecnico == this.tecnico)
    }
    if (this.estado != 0) {
      dataTemp = dataTemp.filter(data=> data.estadoServicioDto.idEstadoServicio == this.estado)
    }
    this.dataSource = new MatTableDataSource<Servicios>(dataTemp);
    this.dataSource.paginator = this.paginator;
  }

  borrar() {
    this.nombreInput = "";
    this.estado= 0;
    this.tecnico = 0;
    this.dataSource = new MatTableDataSource<Servicios>(this.servicios);
    this.dataSource.paginator = this.paginator;
  }

  guardoServicio() {
    this.ObtenerServicios();
    this.numeroPaso = 1;
  }


}

