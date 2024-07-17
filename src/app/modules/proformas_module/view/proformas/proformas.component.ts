import { Component, OnInit } from '@angular/core';
import { proformaData } from '../../models/Response/obtenerProformasResponse';
import { MatTableDataSource } from '@angular/material/table';
import { ProformaService } from '../../services/proforma.service';

@Component({
  selector: 'app-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss']
})
export class ProformasComponent implements OnInit {

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

  
  ngOnInit() {
    this.obtenerProformas();
  }

  obtenerProformas()
  {
    this.proformas.getDatos().subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.PROFORMA_DATA = dataResponse.data;
          this.dataSource = new MatTableDataSource<proformaData>(this.PROFORMA_DATA);
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
}
