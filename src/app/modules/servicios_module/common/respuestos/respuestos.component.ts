import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Respuestos } from '../../models/respuestos.model';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-respuestos',
  templateUrl: './respuestos.component.html',
  styleUrls: ['./respuestos.component.scss']
})
export class RespuestosComponent implements OnInit, AfterViewInit {

  @Output() guardarPrecioRespuesto = new EventEmitter;
  constructor(private _ServiciosService: ServiciosService, private notificationService: NotificationService) { }

   displayedColumns: string[] = 
     [
    'seleccion',
    'id', 
    'codigo',
    'nombre', 
    'precio'
  ];
  
  respuestos: Respuestos[] = [];

  MostrarTabla = true;

  dataSource = new MatTableDataSource<Respuestos>(this.respuestos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);

  ngOnInit() {
    this.cargarRespuesto();
    
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarRespuesto() {
    this._ServiciosService.cargarRespuestos().subscribe(Data => {
      if (Data.codigo == "200") {
        this.respuestos = [...Data.data];
        this.dataSource = new MatTableDataSource<Respuestos>(this.respuestos);
        this.dataSource.paginator = this.paginator;
      }
    }, err => {
      this.notificationService.showError("Hubo problemas técnixos intentalo más tarde.")
    }
    )
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
  nombre = "";
  codigo = "";
  precio = "";

   blockEvent(event: KeyboardEvent) {
      const pattern = /^\d+([,]\d{0,2})?$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
          event.preventDefault();
      }
   }
  
  precioAnterior = "";
  ingresarValor = false;

  guardar() {
    const criteria = {
      valor: this.precio,
      repuestos: this.selection.selected.map(data => {
        return {
          idRepuesto: data.idRepuesto
        }
      })
    }
    this.guardarPrecioRespuesto.emit(criteria);
  }
  onPriceInput(event: Event): void {
    let input = (event.target as HTMLInputElement).value;

    // Expresión regular para validar el formato
    const pattern = /^\d+([.]\d{0,2})?$/;

    if (pattern.test(input) || input === '') {
      this.precio = input;
      this.precioAnterior = this.precio;
    } else {
      // Si el input no es válido, revertir al valor previo
      (event.target as HTMLInputElement).value = this.precioAnterior;
    }
  }

  filtrar() {
    let dataTemp = [...this.respuestos];
    if (this.codigo != "") {
      dataTemp = dataTemp.filter(data=> data.codigoRepuesto.toString().toLowerCase().includes(this.codigo) )
    }
    if (this.nombre != "") {
      dataTemp = dataTemp.filter(data=> data.nombreRepuesto.toLowerCase().includes(this.nombre) )
    }
    this.dataSource = new MatTableDataSource<Respuestos>(dataTemp);
    this.dataSource.paginator = this.paginator;
   }
  
  borrarFiltro() {
    this.codigo = "";
    this.nombre = "";
    this.dataSource = new MatTableDataSource<Respuestos>(this.respuestos);
    this.dataSource.paginator = this.paginator;
  }

}
