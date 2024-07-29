import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from '../../services/productos.service';
import { ItemsResponse } from '../../models/response/productoResponse';
import { ProductosRequest } from '../../models/request/productosRequest';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { agregarProductoRequest } from '../../models/request/agregarProductoRequest';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { EliminarProductoRequest } from '../../models/request/eliminarProductoRequest';
import { EditarProductoRequest } from '../../models/request/editarProductoRequest';
import { ObtenerCategoriaResponse } from '../../models/response/obtenerCategotiasResponse';
import { ObtenerEstadosResponse } from '../../models/response/obtenerEstadosResponse';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, AfterViewInit  {

  constructor(private _productosService : ProductosService, private notificationService: NotificationService) { }
  displayedColumns: string[] = 
  [
    'posicion', 
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
  
  categorias: ObtenerCategoriaResponse[] = [];
  estados: ObtenerEstadosResponse[] = [];

  productoFormGroup = new FormGroup({
    codigo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    modelo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    categoria: new FormControl(0, { validators: Validators.required, updateOn: 'blur' }),
    estado: new FormControl(0, { validators: Validators.required, updateOn: 'blur' }),
  });

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
    }, err => {
      this.notificationService.showError('¡Ocurrió un error al obtener las categorias!');
    });
  }

  obtenerEstados() {
    this._productosService.obtenerEstados().subscribe(data => {
      this.estados = [...data];
    }, err => {
      this.notificationService.showError('¡Ocurrió un error al obtener las categorias!');
    });
  }

  agregarProductos() {
    const criteria : agregarProductoRequest = {
      idCategoria: this.productoFormGroup.value.categoria!,
      codigoProducto: this.productoFormGroup.value.codigo!,
      modelo: this.productoFormGroup.value.modelo!,
      serieProducto: "eliminar",
      idEstadoProducto: this.productoFormGroup.value.estado!,
      precio: 0,
      categoria: {
        idCategoria: this.productoFormGroup.value.categoria!,
        nombreCategoria: this.categorias.find(data=> data.idCategoria == this.productoFormGroup.value.categoria!)?.nombreCategoria!
      },
      estadoProducto: {
        idEstadoProducto: this.productoFormGroup.value.estado!,
        nombreEstadoProducto: this.estados.find(data=> data.idEstadoProducto == this.productoFormGroup.value.estado!)?.nombreEstadoProducto!
      }
    }
    this._productosService.agregarProducto(criteria).subscribe(dataResponse=> {
      if(dataResponse.codigo == '201') {
        this.notificationService.showSuccess('¡Producto agregado con exito!');
        this.obtenerProductos();
        this.cerrarModalAgregarProducto();
      }
      else {
        this.notificationService.showError('¡Ocurrió un error al agregar el producto!');
      }
    }, err => {
      if (err.error.codigo == '500' || err.error.codigo == '409') {
        this.notificationService.showError(err.error.mensaje);
      }
    });
  }

  abrirModalAgregarProducto() {
    this.productoFormGroup.patchValue({
      estado: 1,
    });
    this.viewModel = true;
  }

  activarModalConfirmacionEliminacion(id: number) {
    this.id_temporal_producto = id;
    this.viewEliminar = true;
  }

  eliminarProductos() {
    const criteria  : EliminarProductoRequest = {
      id_producto: this.id_temporal_producto
    }
    this._productosService.eliminarProducto(criteria).subscribe(data => {
      if(data.codigo == '200') {
        this.notificationService.showSuccess('¡Producto eliminado con exito!');
        this.obtenerProductos();
      }
      else {
        this.notificationService.showError('¡Ocurrió un error al eliminar el producto!');
      }
      this.viewEliminar = false;
    }, err => {
      if (err.error.codigo == '500' || err.error.codigo == '404') {
        this.notificationService.showError(err.error.mensaje);
      }
    });
  }

  EditarProductos() {
    const criteria : EditarProductoRequest = {
      idCategoria: this.productoFormGroup.value.categoria!,
      modelo: this.productoFormGroup.value.modelo!,
      serieProducto: "eliminar",
      idEstadoProducto: this.productoFormGroup.value.estado!,
      precio: 0
    }
    this._productosService.editarProducto(criteria,this.id_temporal_producto).subscribe(data=> {
      if(data.codigo == '200') {
        this.notificationService.showSuccess('¡Producto editado con exito!');
        this.obtenerProductos();
        this.cerrarModalEditarProducto();
      }
      else {
        this.notificationService.showError('¡Ocurrió un error al actualizar el producto!');
      }
    }, err => {
      if (err.error.codigo == '500' || err.error.codigo == '404' || err.error.codigo == '409') {
        this.notificationService.showError(err.error.mensaje);
      }
    });
  }

  activarModalEditar(id: number) {
    this.viewEditar = true;
    this.id_temporal_producto = id;
    const dataTemp : ItemsResponse = this.PRODUCTOS_DATA.find(data => data.idProducto == id)!;
    this.productoFormGroup.patchValue({
      codigo: String(dataTemp.codigoProducto),
      modelo: String(dataTemp.modelo),
      categoria: dataTemp.idCategoria,
      estado: dataTemp.idEstadoProducto
    });
  }

  cerrarModalAgregarProducto() {
    this.viewModel = false;
    this.productoFormGroup.reset();
  }

  cerrarModalEditarProducto() {
    this.viewEditar = false;
    this.productoFormGroup.reset();
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
    if (this.categoria != 0) {
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
}
