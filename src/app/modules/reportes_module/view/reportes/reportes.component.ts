import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicio.mode';
import { Producto } from '../../models/producto.model';
import { ReportesService } from '../../services/reporte.service';
import { ExcelService } from '../../services/Excel.service';
import { proformaData } from '../../models/obtenerProformasResponse';
import { Pedido } from 'src/app/modules/pedidos_module/models/pedidos';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  productos: Producto[] = [];
  servicios: Servicios[] = [];
  proformas: proformaData[] = [];
  pedidos: Pedido[] = [];

  displayedColumnsProductos: string[] = ['idProducto', 'nombreCategoria', 'codigoProducto', 'modelo', 'serieProducto', 'estado', 'precio'];
  displayedColumnsServicios: string[] = ['idServicio', 'cliente', 'tipoServicio', 'fechaSolicitudServicio', 'fechaTentativaAtencion', 'estadoServicioDto', 'valor'];
  displayedColumnsProformas: string[] = ['idProforma', 'nombre', 'identificacion', 'subtotal', 'iva', 'total'];
  displayedColumnsPedidos: string[] = ['idPedido', 'cliente', 'tipoPedido', 'fechaPedido', 'producto'];

  constructor( private readonly reportesService: ReportesService, private readonly excelService: ExcelService ) { 
    this.loadProductos();
    this.loadServicios(); 
    this.loadProformas();
    this.obtenerPedidos();
  }

  ngOnInit() {
  }

  loadProformas(): void {
    this.reportesService.obtenerProformas().subscribe(response => {
      this.proformas = response.data;
    });
  }

  obtenerPedidos(): void {
    this.reportesService.obtenerPedidos().subscribe(
      response => {
        if (response.codigo === '200') {
          this.pedidos = response.data;
        }
      },
      error => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  loadProductos(): void {
    this.reportesService.obtenerProductos().subscribe(response => {
      this.productos = response.data;
    });
  }

  loadServicios(): void {
    this.reportesService.obtenerServicios().subscribe(response => {
      this.servicios = response.data;
    });
  }

  exportPedidosToExcel(): void {
    this.excelService.exportAsExcelFile(this.pedidos, 'Pedidos');
  }

  exportProductosToExcel(): void {
    this.excelService.exportAsExcelFile(this.productos, 'Productos');
  }

  exportServiciosToExcel(): void {
    this.excelService.exportAsExcelFile(this.servicios, 'Servicios');
  }

  exportProformasToExcel(): void {
    this.excelService.exportAsExcelFile(this.proformas, 'Proformas');
  }
}
