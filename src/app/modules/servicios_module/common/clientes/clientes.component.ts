import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { ClienteModel } from '../../models/cliente.model';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CiudadModel } from '../../models/ciudad.model';
import { CrearClienteRequest } from '../../models/request/CrearClienteRequest';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  @Output() usuarioSeleccionado = new EventEmitter;
  @Output() cancelarEvent = new EventEmitter;
  constructor(private _ServiciosService: ServiciosService, private notificationService: NotificationService) { }

  displayedColumns: string[] = 
  [
    'id', 
    'identificacion',
    'nombre', 
    'telefono', 
    'dirreccion', 
    'correo', 
    'ciudad', 
    'acciones'
    ];
  
  tipoCliente: number = 1;

  clientes: ClienteModel[] = [];
  ciudades: CiudadModel[] = [];
  
  dataSource = new MatTableDataSource<ClienteModel>(this.clientes);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreInput: string = "";
  identificacionInput: string = "";

  clientesFormGroup = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
    nombres: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    correo: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.email]),
    ciudad: new FormControl(1, { validators: Validators.required, updateOn: 'blur' }),
  });

  ngOnInit() {
    this.obtenerCiudades();
    this.obtenerClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenerClientes() {
    this._ServiciosService.getClientes().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.clientes = dataResponse.data;
        this.dataSource = new MatTableDataSource<ClienteModel>(this.clientes);
        this.dataSource.paginator = this.paginator;
      }
    }, err => {
      this.notificationService.showError("Ocurrió un error al recuperar los clientes. Intentalo más tarde")
    })
  }

  filtrar() {
    let dataTemp = [...this.clientes];
    if (this.nombreInput != "") {
      dataTemp = dataTemp.filter(data=> data.nombres.toLowerCase().includes(this.nombreInput) )
    }
    if (this.identificacionInput != "") {
      dataTemp = dataTemp.filter(data=> data.cedula.toLowerCase().includes(this.identificacionInput) )
    }
    this.dataSource = new MatTableDataSource<ClienteModel>(dataTemp);
    this.dataSource.paginator = this.paginator;
  }

  seleccionarUsuario(id: number) {
    const clienteTemp: ClienteModel = this.clientes.find(data => data.idCliente == id)!;
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

  crearClientes() {
    const criteria: CrearClienteRequest = {
      idCliente: 0,
      cedula: this.clientesFormGroup.value.cedula!,
      nombres: this.clientesFormGroup.value.nombres!,
      telefono: this.clientesFormGroup.value.telefono!,
      direccion: this.clientesFormGroup.value.direccion!,
      correo: this.clientesFormGroup.value.correo!,
      idCiudad: this.clientesFormGroup.value.ciudad!
    }

    this._ServiciosService.crearCliente(criteria).subscribe(dataResponse => {
      if (dataResponse.codigo == "201") {
        this.notificationService.showSuccess(dataResponse.mensaje);
        this.clientesFormGroup.reset();
        const clienteReturn: ClienteModel = {
          idCliente: dataResponse.data[0].idCliente,
          cedula: dataResponse.data[0].cedula,
          nombres: dataResponse.data[0].nombres,
          telefono: dataResponse.data[0].telefono,
          direccion: dataResponse.data[0].direccion,
          correo: dataResponse.data[0].correo,
          idCiudad: this.clientesFormGroup.value.ciudad!,
          ciudad: this.ciudades.find(data=> data.idCiudad == this.clientesFormGroup.value.ciudad!)!
        }
        this.usuarioSeleccionado.emit(clienteReturn);
      }
    }, err => {
      this.notificationService.showError(err.console.error.mensaje);
    });
  }

  cancelar() {
    this.cancelarEvent.emit();
  }

   blockEvent(event: KeyboardEvent) {
    const pattern = /[0-9]/
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }



}
