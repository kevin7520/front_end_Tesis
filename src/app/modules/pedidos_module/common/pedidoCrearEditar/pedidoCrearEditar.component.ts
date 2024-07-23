import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Respuestos } from 'src/app/modules/servicios_module/models/respuestos.model';
import { ServiciosService } from 'src/app/modules/servicios_module/services/servicios.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { PedidoService } from 'src/app/modules/pedidos_module/services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Pedido } from '../../models/obtenerRespuestoResponse';
import { PedidosData } from '../../models/obtenerProformasResponse';
import { DetallePedido } from '../../models/pedidos';
import { CrearPedidoRequest } from '../../models/crearProformaRequest';

@Component({
  selector: 'app-pedidoCrearEditar',
  templateUrl: './pedidoCrearEditar.component.html',
  styleUrls: ['./pedidoCrearEditar.component.scss']
})
export class PedidoCrearEditarComponent implements OnInit, AfterViewInit {

  @Input() crearProforma: boolean = true;
  @Output() cancelar = new EventEmitter();
  @Output() creacionEdicion = new EventEmitter();
  @Input() proformaData!: PedidosData;

  idRepuestoElegido: number = 0;
  cantidad: number = 1;
  respuestos: Respuestos[] = [];
  respuestosNuevos: any[] = [];
  repuestos: DetallePedido[] = [];

  agregarRepuestoModal = false;
  clienteId: number = 0;

  dataSource = new MatTableDataSource<any>(this.respuestosNuevos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clientes: any[] = [];

 displayedColumns: string[] = 
     [
    'id', 
    'codigo',
    'nombre', 
    'precioUnidad',
    'cantidad',
    'precioFinal',
    'acciones'
  ];
  constructor(private proformaService: PedidoService, private _ServiciosService: ServiciosService, private notificationService: NotificationService, private pedidoService: PedidoService) { }

  ngOnInit() {
    this.cargarRespuesto();
    this.obtenerClientes();
    if (!this.crearProforma) {
      this.clienteId = this.proformaData.cliente.idCliente;
      this.cargarRepuestoProforma(this.proformaData.idPedido);
    }
  }

  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  }

  cargarRepuestoProforma(id: number) {
    this.proformaService.getRepuestoProforma(id).subscribe(dataRespose => {
      if (dataRespose.codigo == "200" && dataRespose.data.length>0) {
        this.respuestosNuevos = dataRespose.data.map(data => {
          const proformaNueva: any = data.repuesto;
          proformaNueva.nuevaCantidad = data.cantidad,
          proformaNueva.precioFinal = data.precioFinal
          return proformaNueva  
        });
        this.dataSource = new MatTableDataSource<any>(this.respuestosNuevos);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.notificationService.showError("Error no se cargaron los datos");
      }
    }, err => {
      this.notificationService.showError("Error no se cargaron los datos");
    })
  }



  cargarRespuesto() {
    this._ServiciosService.cargarRespuestos().subscribe(Data => {
      if (Data.codigo == "200") {
        this.respuestos = [...Data.data];
      }
    }, err => {
      this.notificationService.showError("Hubo problemas técnicos intentalo más tarde.")
    }
    )
  }

  obtenerClientes(): void {
    this.pedidoService.getClientes().subscribe(
      response => {
        if (response.codigo === '200') {
          this.clientes = response.data;
        }
      },
      error => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  cancelarAgregarRepuesto() {
    this.idRepuestoElegido = 0;
    this.cantidad = 1;
    this.agregarRepuestoModal = false;
  }

  agregarRepuesto() {
    let repuestoElegido : any = this.respuestos.find(item => item.idRepuesto == this.idRepuestoElegido);
    repuestoElegido.nuevaCantidad = this.cantidad;
    repuestoElegido.precioFinal = this.cantidad*repuestoElegido.precio;
    this.respuestosNuevos.push(repuestoElegido);
    this.dataSource = new MatTableDataSource<any>(this.respuestosNuevos);
    this.dataSource.paginator = this.paginator;
    this.cancelarAgregarRepuesto();
  }

  crearProformaMetodo() {
    const proforma: CrearPedidoRequest = {
      descripcionProducto: "----",
      subtotal: this.getTotalCostSinIva(),
      iva: this.getIva(),
      total: this.getTotalPrecioIva(),
      idCliente: this.clienteId,
      idEstadoPedido: 1,
      detalles: this.respuestosNuevos.map(data => {
        return {
          idRepuesto: data.idRepuesto,
          cantidad: data.nuevaCantidad,
          descripcionRepuesto: "----",
          precioUnitario: data.precio,
          precioFinal: data.precioFinal
        }
      })
    }
    if (this.crearProforma) {
      this.proformaService.crearPedido(proforma).subscribe(dataResponse => {
        this.notificationService.showSuccess("Pedido creada exitosamente");
        this.creacionEdicion.emit();
      }, err => {
        this.notificationService.showError("Hubo error al crear pedido");
      })
    }
    else {
        this.proformaService.editarPedido(proforma, this.proformaData.idPedido).subscribe(dataResponse => {
              if (dataResponse.codigo == "200") {
                this.notificationService.showSuccess("Pedido editado exitosamente");
                this.creacionEdicion.emit();
              }
              else {
                this.notificationService.showError("Hubo error al editar el Pedido");
              }
            }, err => {
              this.notificationService.showError("Hubo error al editar el Pedido");
            })
    }
    
  }

  eliminarRepuesto(id:number) {
    this.respuestosNuevos.splice(id, 1);
    this.dataSource = new MatTableDataSource<any>(this.respuestosNuevos);
    this.dataSource.paginator = this.paginator;
  }

  getTotalCostSinIva() {
    let precioSinIva = 0;
    this.respuestosNuevos.forEach(data => {
      precioSinIva = data.precioFinal + precioSinIva;
    });
    return precioSinIva;
  }

  getTotalPrecioIva() {
    let precioSinIva = 0;
    this.respuestosNuevos.forEach(data => {
      precioSinIva = data.precioFinal + precioSinIva;
    });
    const precio = precioSinIva
    return precio + (precioSinIva*0.15);
  }

  getIva() {
    let precioSinIva = 0;
    this.respuestosNuevos.forEach(data => {
      precioSinIva = data.precioFinal + precioSinIva;
    });
    return precioSinIva*0.15;
  }
  
  cancel() {
    this.cancelar.emit();
  }


}
