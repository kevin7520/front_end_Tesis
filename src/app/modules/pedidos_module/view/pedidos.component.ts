import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../services/pedido.service';
import { Pedido, Cliente, Producto } from '../models/pedidos';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProformaService } from '../../proformas_module/services/proforma.service';
import { ServiciosService } from '../../servicios_module/services/servicios.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { PedidosData } from '../models/obtenerProformasResponse';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit, AfterViewInit {

  constructor(private proformas: PedidoService, private _ServiciosService: ServiciosService, private notificationService: NotificationService) { }
  
  proformaCrearItems: any[] = [];
  proformaData!: PedidosData;  
  idRepuestoElegido: number = 0;
  cantidad: number = 0;
  paso = 1;
  ngOnInit() {
    this.obtenerProformas();
    //this.cargarRespuesto();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  verProforma: boolean = false;
  id_proforma = 0;
  displayedColumns: string[] = 
  [
    'idProforma', 
    'nombre', 
    'identificacion', 
    'subtotal', 
    'iva',
    'total',
    'acciones'
    ];
  
  PROFORMA_DATA: PedidosData[] = [];
  dataSource = new MatTableDataSource<PedidosData>(this.PROFORMA_DATA);
 @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  


  obtenerProformas()
  {
    this.proformas.getDatos().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.PROFORMA_DATA = dataResponse.data;
        this.dataSource = new MatTableDataSource<PedidosData>(this.PROFORMA_DATA);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  

  editarProforma(id: number) {
    this.proformaData = this.PROFORMA_DATA.find(item => item.idPedido == id)!;
    this.paso = 3;

  }

  verProformaMetodo(id: number) {
    this.id_proforma = id;
    this.verProforma = true;
  }

  descargarProformaMetodo(id: number) {
    this.id_proforma = id;
  }

  nombre = "";
  identificacion = "";

   filtrar() {
    let dataTemp = [...this.PROFORMA_DATA];
    if (this.nombre != "") {
      dataTemp = dataTemp.filter(data=> data.cliente.nombres.toString().toLowerCase().includes(this.nombre) )
    }
    if (this.identificacion != "") {
      dataTemp = dataTemp.filter(data=> data.cliente.cedula.toLowerCase().includes(this.identificacion) )
    }
    this.dataSource = new MatTableDataSource<PedidosData>(dataTemp);
    this.dataSource.paginator = this.paginator;
   }
  
  borrarFiltro() {
    this.nombre = "";
    this.identificacion = "";
    this.dataSource = new MatTableDataSource<PedidosData>(this.PROFORMA_DATA);
    this.dataSource.paginator = this.paginator;
  }

  creacionEdicionProforma() {
    this.obtenerProformas();
    this.paso = 1;
  }

  
}
