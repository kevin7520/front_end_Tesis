import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sevicios',
  templateUrl: './sevicios.component.html',
  styleUrls: ['./sevicios.component.scss']
})
export class SeviciosComponent implements OnInit {

  constructor() { }

  viewMostrarMesaTrabajo: boolean = true;
  mesaTrabajoSeleccionada: number = 0;
  ngOnInit() {
  }

  seleccionarMenu(id: number) {
    this.mesaTrabajoSeleccionada = id;
    this.viewMostrarMesaTrabajo = false;
  }

  salirMenu() {
     this.mesaTrabajoSeleccionada = 0;
    this.viewMostrarMesaTrabajo = true;
  }

}
