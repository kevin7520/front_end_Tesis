import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { proformaData } from '../../models/Response/obtenerProformasResponse';
import { ProformaService } from '../../services/proforma.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { detalleProformna } from '../../models/Response/obtenerRespuestoResponse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-documento_visualizacion',
  templateUrl: './documento_visualizacion.component.html',
  styleUrls: ['./documento_visualizacion.component.css']
})
export class  Documento_visualizacionComponent implements OnInit {

  @Input() id_proforma: number = 2;
  @Input() descargar: boolean = false;
  @Output() cerrarDescarga = new EventEmitter();
  constructor(private proforma: ProformaService, private notificationService: NotificationService,) { }

  datos!: proformaData;
  repuestos: detalleProformna[] = [];
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
            this.descargarmeotodo();
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
