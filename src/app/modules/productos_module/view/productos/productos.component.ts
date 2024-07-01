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
    'serie_producto', 
    'estado_producto',
    'acciones'
  ];
  PRODUCTOS_DATA: ItemsResponse[] = [];
  dataSource = new MatTableDataSource<ItemsResponse>(this.PRODUCTOS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  viewModel : boolean = false;
  viewEliminar : boolean = false;
  viewEditar : boolean = false;

  id_temporal_producto : number = 0;

  productoFormGroup = new FormGroup({
    codigo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    modelo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    serie: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    categoria: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    estado: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
  });

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    const criteria : ProductosRequest = {
      token: "Prueba"
    }
    this._productosService.getProductos(criteria).subscribe(data=>{
      if(data.respuesta.codigo == '0'){
        this.PRODUCTOS_DATA = [...data.productos];
        this.dataSource = new MatTableDataSource<ItemsResponse>(this.PRODUCTOS_DATA);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  agregarProductos() {
    const criteria : agregarProductoRequest = {
      id_categoria: 0,
      codigo_producto: this.productoFormGroup.value.codigo!,
      modelo: this.productoFormGroup.value.modelo!,
      serie_producto: this.productoFormGroup.value.serie!,
      id_estado_producto: 0,
    }
    this._productosService.agregarProducto(criteria).subscribe(data=> {
      if(data.codigo == '0') {
        this.notificationService.showSuccess('¡Producto agregado con exito!');
        this.cerrarModalAgregarProducto();
      }
      else {
        this.notificationService.showError(data.msg);
      }
    });
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
      if(data.codigo == '0') {
        this.notificationService.showSuccess('¡Producto eliminado con exito!');
      }
      else {
        this.notificationService.showError(data.msg);
      }
      this.viewEliminar = false;
    })
  }

  EditarProductos() {
    const criteria : agregarProductoRequest = {
      id_categoria: 0,
      codigo_producto: this.productoFormGroup.value.codigo!,
      modelo: this.productoFormGroup.value.modelo!,
      serie_producto: this.productoFormGroup.value.serie!,
      id_estado_producto: 0,
    }
    this._productosService.agregarProducto(criteria).subscribe(data=> {
      if(data.codigo == '0') {
        this.notificationService.showSuccess('¡Producto editado con exito!');
        this.cerrarModalEditarProducto();
      }
      else {
        this.notificationService.showError(data.msg);
      }
    });
  }

  activarModalEditar(id: number) {
    this.viewEditar = true;
    debugger;
    const dataTemp : ItemsResponse = this.PRODUCTOS_DATA.find(data => data.id_producto == id)!;
    this.productoFormGroup.patchValue({
      codigo: String(dataTemp.codigo_producto),
      modelo: String(dataTemp.modelo),
      serie: String(dataTemp.serie_producto),
      categoria: String(dataTemp.categoria),
      estado: String(dataTemp.estado_producto)
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

}
