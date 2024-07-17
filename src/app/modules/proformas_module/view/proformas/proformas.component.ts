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
  ngOnInit() {
    //this.obtenerProformas();
  }

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  
}
