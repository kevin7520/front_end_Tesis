import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { agregarProductoRequest } from 'src/app/modules/productos_module/models/request/agregarProductoRequest';
import { EditarProductoRequest } from 'src/app/modules/productos_module/models/request/editarProductoRequest';
import { EliminarProductoRequest } from 'src/app/modules/productos_module/models/request/eliminarProductoRequest';
import { ProductosRequest } from 'src/app/modules/productos_module/models/request/productosRequest';
import { ObtenerCategoriaResponse } from 'src/app/modules/productos_module/models/response/obtenerCategotiasResponse';
import { ObtenerEstadosResponse } from 'src/app/modules/productos_module/models/response/obtenerEstadosResponse';
import { ItemsResponse } from 'src/app/modules/productos_module/models/response/productoResponse';
import { ProductosService } from 'src/app/modules/productos_module/services/productos.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, AfterViewInit  {
  productoFormGroup: any;

  @Output() guardasProductos = new EventEmitter;

  constructor(private _productosService : ProductosService, private notificationService: NotificationService) { }
  displayedColumns: string[] = 
  [
    'id_producto', 
    'categoria', 
    'codigo_producto', 
    'modelo', 
    'estado_producto',
    'acciones'
  ];
  PRODUCTOS_DATA: ItemsResponse[] = [];
  dataSource = new MatTableDataSource<ItemsResponse>(this.PRODUCTOS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  viewModel : boolean = false;
  viewEliminar : boolean = false;
  viewEditar : boolean = false;

  id_temporal_producto: number = 0;

  elegitProducto = true;
  
  categorias: ObtenerCategoriaResponse[] = [];
  estados: ObtenerEstadosResponse[] = [];

  productosSeleccionados: ItemsResponse[] = [];


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {
    this.obtenerCategoria();
    this.obtenerProductos();
    this.obtenerEstados();
  }

  obtenerProductos() {
    const criteria : ProductosRequest = {
      token: "Prueba"
    }
    this._productosService.getProductos(criteria).subscribe(dataResponse=>{
      if(dataResponse.codigo == '200'){
        this.PRODUCTOS_DATA = [...dataResponse.data];
        this.dataSource = new MatTableDataSource<ItemsResponse>(this.PRODUCTOS_DATA);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.notificationService.showSuccess('No se encontraron productos');
      }
    }, (err) => {
      debugger;
      if (err.error.codigo == '404') {
        this.notificationService.showError('No se encontraron productos');
      }
      else {
        this.notificationService.showError('Ocurrieron errores técnicos intentolo más tarde.');
      }
    })
  }

  obtenerCategoria() {
    this._productosService.obtenerCategoria().subscribe(data => {
      this.categorias = [...data];
      debugger;
    }, err => {
      this.notificationService.showError('¡Ocurrió un error al obtener las categorias!');
    });
  }

  obtenerEstados() {
    this._productosService.obtenerEstados().subscribe(data => {
      this.estados = [...data];
      debugger;
    }, err => {
      this.notificationService.showError('¡Ocurrió un error al obtener las categorias!');
    });
  }

  codigo: string = "";
  modelo: string = "";
  estado: number = 0;
  categoria: number = 0;

   filtrar() {
    let dataTemp = [...this.PRODUCTOS_DATA];
    if (this.codigo != "") {
      dataTemp = dataTemp.filter(data=> data.codigoProducto.toString().toLowerCase().includes(this.codigo) )
    }
    if (this.modelo != "") {
      dataTemp = dataTemp.filter(data=> data.modelo.toLowerCase().includes(this.modelo) )
    }
    if (this.estado != 0) {
      dataTemp = dataTemp.filter(data=> data.estadoProducto.idEstadoProducto == this.estado )
    }
    if (this.estado != 0) {
      dataTemp = dataTemp.filter(data=> data.categoria.idCategoria == this.categoria )
    }
    this.dataSource = new MatTableDataSource<ItemsResponse>(dataTemp);
    this.dataSource.paginator = this.paginator;
   }
  
  borrarFiltro() {
    this.codigo = "";
    this.modelo = "";
    this.estado = 0;
    this.categoria = 0;
    this.dataSource = new MatTableDataSource<ItemsResponse>(this.PRODUCTOS_DATA);
    this.dataSource.paginator = this.paginator;
  }

  productosDataAdicional: any[] = []

  elegir(id: number) {
    this.productosDataAdicional = [];
    const data : ItemsResponse = this.PRODUCTOS_DATA.find(data => data.idProducto == id)!;
    this.productosSeleccionados.push(data);
    this.elegitProducto = false;
    this.productosDataAdicional.push({
      idProducto: data.idProducto,
      nombreProducto: data.modelo,
      valor: 0,
      serie: ""
    });
  }

  guardarProductos() {
    this.guardasProductos.emit(this.productosDataAdicional);
  }

}
