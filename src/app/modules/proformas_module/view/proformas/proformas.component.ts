import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { proformaData } from '../../models/Response/obtenerProformasResponse';
import { MatTableDataSource } from '@angular/material/table';
import { ProformaService } from '../../services/proforma.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss']
})
export class ProformasComponent implements OnInit, AfterViewInit {

  constructor(private proformas : ProformaService) { }
  
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
  
  PROFORMA_DATA: proformaData[] = [];
  dataSource = new MatTableDataSource<proformaData>(this.PROFORMA_DATA);
 @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit() {
    this.obtenerProformas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  obtenerProformas()
  {
    this.proformas.getDatos().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.PROFORMA_DATA = dataResponse.data;
        this.dataSource = new MatTableDataSource<proformaData>(this.PROFORMA_DATA);
        this.dataSource.paginator = this.paginator;
      }
    })
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
    this.dataSource = new MatTableDataSource<proformaData>(dataTemp);
    this.dataSource.paginator = this.paginator;
   }
  
  borrarFiltro() {
    this.nombre = "";
    this.identificacion = "";
    this.dataSource = new MatTableDataSource<proformaData>(this.PROFORMA_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
