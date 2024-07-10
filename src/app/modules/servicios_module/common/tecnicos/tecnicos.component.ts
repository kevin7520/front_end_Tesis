import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { ClienteModel } from '../../models/cliente.model';
import { CiudadModel } from '../../models/ciudad.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrearClienteRequest } from '../../models/request/CrearClienteRequest';
import { MatStepper } from '@angular/material/stepper';
import { CrearTecnicoRequest } from '../../models/request/crearTecnicoRequest';
import { tecnicos } from '../../models/tecnico.model';
import { Horario } from '../../models/horario.model';
import { CrearHorarioRequest } from '../../models/request/crearHorario';
import { Event } from '@angular/router';
import { EditarServicioRequest } from '../../models/request/editarServicioRequest';
import { Servicios } from '../../models/servicio.mode';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss']
})
export class TecnicosComponent implements OnInit, AfterViewInit {

  @Output() usuarioSeleccionado = new EventEmitter;
  @Output() cancelarEvent = new EventEmitter;
  @Output() salirEvent = new EventEmitter;
  @Input() servicio!: Servicios;
  @ViewChild(MatStepper) stepper!: MatStepper;
  tecnicos: tecnicos[] = [];
  constructor(private _ServiciosService: ServiciosService, private notificationService: NotificationService) { }

  fechaActual = new Date();
  displayedColumns: string[] = 
  [
    'id', 
    'identificacion',
    'nombre', 
    'telefono', 
    'acciones'
    ];
  
  tipoCliente: number = 1;

  ciudades: CiudadModel[] = [];

  tecnico!: tecnicos;

  timeSlots = [
  { id: 25, horaInicio: "08:00:00", horaFin: "08:20:00", horario: "08:00 - 08:20 AM" },
  { id: 26, horaInicio: "08:20:00", horaFin: "08:40:00", horario: "08:20 - 08:40 AM" },
  { id: 27, horaInicio: "08:40:00", horaFin: "09:00:00", horario: "08:40 - 09:00 AM" },
  { id: 28, horaInicio: "09:00:00", horaFin: "09:20:00", horario: "09:00 - 09:20 AM" },
  { id: 29, horaInicio: "09:20:00", horaFin: "09:40:00", horario: "09:20 - 09:40 AM" },
  { id: 30, horaInicio: "09:40:00", horaFin: "10:00:00", horario: "09:40 - 10:00 AM" },
  { id: 31, horaInicio: "10:00:00", horaFin: "10:20:00", horario: "10:00 - 10:20 AM" },
  { id: 32, horaInicio: "10:20:00", horaFin: "10:40:00", horario: "10:20 - 10:40 AM" },
  { id: 33, horaInicio: "10:40:00", horaFin: "11:00:00", horario: "10:40 - 11:00 AM" },
  { id: 34, horaInicio: "11:00:00", horaFin: "11:20:00", horario: "11:00 - 11:20 AM" },
  { id: 35, horaInicio: "11:20:00", horaFin: "11:40:00", horario: "11:20 - 11:40 AM" },
  { id: 36, horaInicio: "11:40:00", horaFin: "12:00:00", horario: "11:40 - 12:00 PM" },
  { id: 37, horaInicio: "12:00:00", horaFin: "12:20:00", horario: "12:00 - 12:20 PM" },
  { id: 38, horaInicio: "12:20:00", horaFin: "12:40:00", horario: "12:20 - 12:40 PM" },
  { id: 39, horaInicio: "12:40:00", horaFin: "13:00:00", horario: "12:40 - 01:00 PM" },
  { id: 40, horaInicio: "13:00:00", horaFin: "13:20:00", horario: "01:00 - 01:20 PM" },
  { id: 41, horaInicio: "13:20:00", horaFin: "13:40:00", horario: "01:20 - 01:40 PM" },
  { id: 42, horaInicio: "13:40:00", horaFin: "14:00:00", horario: "01:40 - 02:00 PM" },
  { id: 43, horaInicio: "14:00:00", horaFin: "14:20:00", horario: "02:00 - 02:20 PM" },
  { id: 44, horaInicio: "14:20:00", horaFin: "14:40:00", horario: "02:20 - 02:40 PM" },
  { id: 45, horaInicio: "14:40:00", horaFin: "15:00:00", horario: "02:40 - 03:00 PM" },
  { id: 46, horaInicio: "15:00:00", horaFin: "15:20:00", horario: "03:00 - 03:20 PM" },
  { id: 47, horaInicio: "15:20:00", horaFin: "15:40:00", horario: "03:20 - 03:40 PM" },
  { id: 48, horaInicio: "15:40:00", horaFin: "16:00:00", horario: "03:40 - 04:00 PM" },
  { id: 49, horaInicio: "16:00:00", horaFin: "16:20:00", horario: "04:00 - 04:20 PM" },
  { id: 50, horaInicio: "16:20:00", horaFin: "16:40:00", horario: "04:20 - 04:40 PM" },
  { id: 51, horaInicio: "16:40:00", horaFin: "17:00:00", horario: "04:40 - 05:00 PM" },
  { id: 52, horaInicio: "17:00:00", horaFin: "17:20:00", horario: "05:00 - 05:20 PM" },
  { id: 53, horaInicio: "17:20:00", horaFin: "17:40:00", horario: "05:20 - 05:40 PM" },
  { id: 54, horaInicio: "17:40:00", horaFin: "18:00:00", horario: "05:40 - 06:00 PM" },
  { id: 55, horaInicio: "18:00:00", horaFin: "18:20:00", horario: "06:00 - 06:20 PM" },
  ];
  
  dataSource = new MatTableDataSource<tecnicos>(this.tecnicos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreInput: string = "";
  identificacionInput: string = "";

  clientesFormGroup = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
  });

  horarioFormGroup = new FormGroup({
    fecha: new FormControl(new Date(), [Validators.required]),
    horario: new FormControl(0, { validators: Validators.required}),
  });

  ngOnInit() {
    this.obtenerCiudades();
    this.obtenerTecnicos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  horariosOcupados : Horario[] = []

  obtenerTecnicos() {
    this._ServiciosService.getTecnicos().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.tecnicos = dataResponse.data.filter(data => data.estadoTecnico.idEstado == 1);
        this.dataSource = new MatTableDataSource<tecnicos>(this.tecnicos);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.notificationService.showError("Error al cargar los técnicos")
      }
    }, err => {
      this.notificationService.showError("Ocurrió un error al recuperar los técnicos. Intentalo más tarde")
    })
  }

  obtenerHorarioTecnico(id: number) {

  }

  filtrar() {
    let dataTemp = [...this.tecnicos];
    if (this.nombreInput != "") {
      dataTemp = dataTemp.filter(data=> data.nombreTecnico.toLowerCase().includes(this.nombreInput) )
    }
    if (this.identificacionInput != "") {
      dataTemp = dataTemp.filter(data=> data.cedula.toLowerCase().includes(this.identificacionInput) )
    }
    this.dataSource = new MatTableDataSource<tecnicos>(dataTemp);
    this.dataSource.paginator = this.paginator;
  }

  seleccionarUsuario(id: number) {
    const clienteTemp: tecnicos = this.tecnicos.find(data => data.idTecnico == id)!;
    this.usuarioSeleccionado.emit(clienteTemp);
  }

  obtenerCiudades() {
     this._ServiciosService.getCiudades().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.ciudades = dataResponse.data;
      }
    }, err => {
      this.notificationService.showError("Ocurrió un error al recuperar las ciudades. Intentalo más tarde")
    })
  }

  crearTecnico(stepper: MatStepper) {
    const criteria: CrearTecnicoRequest = {
      cedula: this.clientesFormGroup.value.cedula!,
      nombreTecnico: this.clientesFormGroup.value.nombres!,
      telefonoTecnico: this.clientesFormGroup.value.telefono!,
      idEstado: 1
    }

    this._ServiciosService.crearTecnico(criteria).subscribe(dataResponse => {
      if (dataResponse.codigo == "201") {
        this.notificationService.showSuccess(dataResponse.mensaje);
        this.clientesFormGroup.reset();
        this.validadorComplete = true;
        this.tipoCliente = 1;
        this.tecnico = {
          idTecnico: dataResponse.data.idTecnico,
          cedula: dataResponse.data.cedula,
          nombreTecnico: dataResponse.data.nombreTecnico,
          telefonoTecnico: dataResponse.data.telefonoTecnico,
          estadoTecnico: dataResponse.data.estadoTecnico
        }
        setTimeout(() => {
          stepper.next();
        }, 0);
      }
    }, err => {
      this.notificationService.showError(err.console.error.mensaje);
    });
  }

  cancelar() {
    this.cancelarEvent.emit();
  }

  validadorComplete = false;
  validadorComplete2 = false;

  executeAndProceed(stepper: MatStepper, id: number): void {
    this.validadorComplete = true;
    this.tecnico = this.tecnicos.find(data => data.idTecnico = id)!;
    setTimeout(() => {
      stepper.next();
      this._ServiciosService.horarioTecnico(this.tecnico.idTecnico).subscribe(data => {
        if (data.codigo == "200") {
          this.horariosOcupados = [...data.data];
        }
      })
    }, 0);
  }

  returnAndProceed(stepper: MatStepper): void {
    this.tecnico = {
      idTecnico: 0,
      nombreTecnico: "",
      cedula: "",
      telefonoTecnico: "",
      estadoTecnico: {
        idEstado: 0,
        nombreEstado: ""
      }
    };
    this.horarioFormGroup.patchValue({
      horario: 0,
      fecha: new Date()
    });
    stepper.previous();
    this.validadorComplete = false;
    this.obtenerTecnicos();
  }

  bloquearHorario(horaInicio: string) : boolean {
    let validador = false;
    const fechaRemp = this.horariosOcupados.filter(data => this.sonFechasIguales(this.horarioFormGroup.value.fecha!, new Date(data.fecha)));
    if (fechaRemp.length > 0 && fechaRemp.some(data => data.horaInicio == horaInicio)) {
      return true;
    }
    return validador;
  }
  
  sonFechasIguales(fecha1: Date, fecha2: Date): boolean {
    return fecha1.getFullYear() === fecha2.getFullYear() &&
          fecha1.getMonth() === fecha2.getMonth() &&
          fecha1.getDate() === fecha2.getDate();
  };

  onSelectionChange(event: any, stepper: MatStepper) {
    debugger;
    if (event.selectedIndex < stepper.selectedIndex) {
      // Prevenir ir hacia atrás
      this.stepper.selectedIndex = stepper.selectedIndex;
    }
  }

  idHorario: number = 0;
  editable: boolean = true;

  crearHorarios(stepper: MatStepper) {
    const horario = this.timeSlots.find(data => data.id == this.horarioFormGroup.value.horario);
    const criteria: CrearHorarioRequest = {
      idTecnico: this.tecnico.idTecnico,
      fecha: this.horarioFormGroup.value.fecha!,
      horaInicio: horario?.horaInicio!,
      horaFin: horario?.horaFin!,
    }
    this._ServiciosService.crearHorario(criteria).subscribe(dataResponse => {
      if (dataResponse.codigo == "201") {
        this.idHorario = dataResponse.data.idHorario;
        this._ServiciosService.guardarHorarioServicio({ idServicio: this.servicio.idServicio, idHorario: dataResponse.data.idHorario}).subscribe(dataResponse2 => {
          if (dataResponse.codigo == "201") {
            const criteria: EditarServicioRequest = {
                    idCliente: this.servicio.cliente.idCliente,
                    idTecnico: this.tecnico.idTecnico,
                    idTipoServicio: this.servicio.tipoServicio.idTipoServicio,
                    idEstadoServicio: 2,
                    productos: [],
                    fechaTentativaAtencion: this.servicio.fechaSolicitudServicio
            };
            this._ServiciosService.editarServicio(criteria, this.servicio.idServicio).subscribe(dataResponse3 => {
                if (dataResponse3.codigo == "200") {
                  this.notificationService.showSuccess("Servicio actualizado correctamente con estado coordinado")
                }
                else {
                  this.notificationService.showError("Servicio un error al actualizar el servicio")
                }
            }, err => {
                this.notificationService.showError("Servicio un error al actualizar el servicio. Intentalo más tarde")
            });
          }
        });
        this.editable = false;
        this.validadorComplete2 = true;
        setTimeout(() => {
          stepper.next();
        }, 0);
      }
      else {
        this.notificationService.showError("Error al crear horario Intentalo más tarde");
      }
    }, err => {
      this.notificationService.showError("Error al crear horario Intentalo más tarde")
    })
  }

  editarServicioProductos(event: any) {
    const criteria: EditarServicioRequest = {
      idCliente: this.servicio.cliente.idCliente,
      idTecnico: this.tecnico.idTecnico,
      idTipoServicio: this.servicio.tipoServicio.idTipoServicio,
      idEstadoServicio: 3,
      productos: event,
      fechaTentativaAtencion: this.servicio.fechaSolicitudServicio
    };
    this._ServiciosService.editarServicio(criteria, this.servicio.idServicio).subscribe(dataResposne => {
      if (dataResposne.codigo == "200") {
        this.notificationService.showSuccess("Servicio actualizado correctamente con estado pendiente");
        this.salirEvent.emit();
      }
      else {
        this.notificationService.showError("Servicio un error al actualizar el servicio")
      }
    }, err => {
      this.notificationService.showError("Servicio un error al actualizar el servicio. Intentalo más tarde")
    });
  }


}

