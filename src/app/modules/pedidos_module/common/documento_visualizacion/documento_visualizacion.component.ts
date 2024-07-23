import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PedidoService } from '../../services/pedido.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { PedidosData } from '../../models/obtenerProformasResponse';
import { DetallePedido } from '../../models/pedidos';
import { detallePedido } from '../../models/obtenerRespuestoResponse';
import { ExcelService } from 'src/app/modules/reportes_module/services/Excel.service';

@Component({
  selector: 'app-documento_pedido',
  templateUrl: './documento_visualizacion.component.html',
  styleUrls: ['./documento_visualizacion.component.css']
})
export class  Documento_PedidoComponent implements OnInit {

  @Input() id_proforma: number = 2;
  @Input() descargar: boolean = false;
  @Output() cerrarDescarga = new EventEmitter();
  constructor(private proforma: PedidoService, private notificationService: NotificationService, private readonly excelService: ExcelService) { }

  datos!: PedidosData;
  repuestos: detallePedido[] = [];
  ngOnInit() {
    this.cargarproformaDatos();
  }
  
  cargarproformaDatos() {
    this.proforma.getDatosId(this.id_proforma).subscribe(dataRespose => {
      if (dataRespose.codigo == "200" && dataRespose.data.length>0) {
        this.datos = dataRespose.data[0];
        this.cargarRepuestoProforma();
      }
      else {
        this.notificationService.showError("Error no se cargaron los datos");
        this.cerrarDescarga.emit()
      }
    }, err => {
      this.notificationService.showError("Error no se cargaron los datos");
      this.cerrarDescarga.emit()
    })
  }

  cargarRepuestoProforma() {
    this.proforma.getRepuestoProforma(this.id_proforma).subscribe(dataRespose => {
      if (dataRespose.codigo == "200" && dataRespose.data.length>0) {
        this.repuestos = dataRespose.data;
        setTimeout(() => {
          if (this.descargar == true) {
            const pedido: any[] = [];
            const DatosFormat = {
              Id_Pedido: this.datos.idPedido,
              Nombre_Cliente: this.datos.cliente.nombres,
              Cedula_Cliente: this.datos.cliente.cedula,
              Telefonono_Cliente: this.datos.cliente.telefono,
              Direccion_Cliente: this.datos.cliente.direccion,
              Correo_Cliente: this.datos.cliente.correo,
              Repuestos: dataRespose.data.map(item => {
                return {
                  ID_DETALLE: item.idDetallePedido,
                  Nombre_Repuesto: item.repuesto.nombreRepuesto,
                  Codigo_Repuesto: item.repuesto.codigoRepuesto,
                  Precio_Repuesto: item.precioUnitario,
                  Cantidad: item.cantidad
                }
              }),
              Sub_Total: this.datos.subtotal,
              IVA: this.datos.iva,
              Total: this.datos.total,
              Estado_Pedido: this.datos.estadoPedido.nombreEstadoPedido
            }
            pedido.push(DatosFormat);
            this.excelService.exportAsExcelFile(pedido, 'Pedidos');
            setTimeout(() => {
              this.cerrarDescarga.emit()
            }, 1000);
          }
        }, 1000);
      }
      else {
        this.notificationService.showError("Error no se cargaron los datos");
        this.cerrarDescarga.emit()
      }
    }, err => {
      this.notificationService.showError("Error no se cargaron los datos");
      this.cerrarDescarga.emit()
    })
  }
  public descargarmeotodo() : void {
    let DATA: any = document.getElementById('htmlData');

    const marginLeft = 15;
    const marginTop = 10;
    const marginRight = 15;
    const marginBottom = 10;

    html2canvas(DATA, { scale: 2, useCORS: true }).then((canvas) => {
      let pageWidth = 210;
      let pageHeight = 297; 
      let fileWidth = pageWidth - marginLeft - marginRight;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = marginTop;

      if (fileHeight < pageHeight - marginTop - marginBottom) {
        PDF.addImage(FILEURI, 'PNG', marginLeft, position, fileWidth, fileHeight);
      } else {
        let heightLeft = fileHeight;
        let pageNumber = 0;

        while (heightLeft > 0) {
          if (pageNumber > 0) {
            PDF.addPage();
          }
          const topPosition = pageNumber * (pageHeight - marginTop - marginBottom) + marginTop;
          PDF.addImage(FILEURI, 'PNG', marginLeft, -topPosition, fileWidth, fileHeight);
          heightLeft -= (pageHeight - marginTop - marginBottom);
          pageNumber++;
        }
      }

      PDF.save('Proforma.pdf');
    }).then( () => {
      this.cerrarDescarga.emit()
    });
  }

}
