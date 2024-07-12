import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { SelectionModel } from '@angular/cdk/collections';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, AfterViewInit  {
  productoFormGroup: any;

  @Output() guardasProductos = new EventEmitter;
  @Input() tipo = 1;
  @Input() tipoServocio = 1;

  constructor(private _productosService : ProductosService, private notificationService: NotificationService, private serviciosService: ServiciosService) { }
  displayedColumns: string[] = 
  [
    'id_producto', 
    'categoria', 
    'codigo_producto', 
    'modelo', 
    'estado_producto',
    'acciones'
  ];
  displayedColumns2: string[] = 
    [
    'seleccion',
    'id_producto', 
    'categoria', 
    'codigo_producto', 
    'modelo', 
    'estado_producto'
  ];
  PRODUCTOS_DATA: ItemsResponse[] = [];
  dataSource = new MatTableDataSource<ItemsResponse>(this.PRODUCTOS_DATA);
  selection = new SelectionModel<any>(true, []);

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
    this.productosDataAdicional = [];
    const data : ItemsResponse = this.PRODUCTOS_DATA.find(data => data.idProducto == id)!;
    this.productosSeleccionados.push(data);
    this.elegitProducto = false;
    this.productosDataAdicional.push({
      idProducto: data.idProducto,
      nombreProducto: data.modelo,
      valor: 0,
      serie: "",
      validado: false,
    });
  }

  elegirVariosProductos() {
     this.productosDataAdicional = [];
    this.productosDataAdicional = [];
    this.selection.selected.forEach(dataArray => {
      const data : ItemsResponse = this.PRODUCTOS_DATA.find(data => data.idProducto == dataArray.idProducto)!;
      this.productosSeleccionados.push(data);
      this.elegitProducto = false;
      this.productosDataAdicional.push({
        idProducto: data.idProducto,
        nombreProducto: data.modelo,
        validado: false,
        valor: "",
        valorAnterior: "",
        serie: ""
      });
    })  
  }

  onPriceInput(event: Event, index: number): void {
    let input = (event.target as HTMLInputElement).value;

    // Expresión regular para validar el formato
    const pattern = /^\d+([.]\d{0,2})?$/;

    if (pattern.test(input) || input === '') {
      this.productosDataAdicional[index].valor = input;

      this.productosDataAdicional[index].valorAnterior = this.productosDataAdicional[index].valor;
    } else {
      // Si el input no es válido, revertir al valor previo
      (event.target as HTMLInputElement).value = this.productosDataAdicional[index].valorAnterior;
    }
  }

  guardarProductos() {
    this.guardasProductos.emit(this.productosDataAdicional);
  }

  verificarProducto(idProducto: number, serie: string) {
    const idProductoTemp = this.productosDataAdicional.findIndex( data => data.idProducto == idProducto)
    if (this.productosDataAdicional.some(data => (serie == data.serie && data.idProducto != idProducto &&  data.validado))) {
      this.notificationService.showError("Número de serie ya esta ocupado");
      this.productosDataAdicional[idProductoTemp].validado = false
    }
    else {
      this.serviciosService.verificarSerie(serie).subscribe(dataResponse => {
        if (dataResponse.codigo == "200") {
          this.productosDataAdicional[idProductoTemp].validado = true;
          this.notificationService.showSuccess("Producto validado");
        }
        else {
          this.productosDataAdicional[idProductoTemp].validado = false;
           this.notificationService.showError("Número de serie ya esta ocupado");
        }
      }, err => {
        this.notificationService.showError("Error consulta serie. Intentallo más tarde");
        this.productosDataAdicional[idProductoTemp].validado = false;
      })
    }
    
  }

  validadarTodosvalidos(): boolean {
    return this.productosDataAdicional.some(dataRespuesta => dataRespuesta.validado == false);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
