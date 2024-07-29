import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor( private _router : Router, private _usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) { }

  menu_active: boolean = true;
  nombreUsuario: string = "";
  rol = "";
  menuActual = "";

  menu_items: any[] = []
  ngOnInit() {
    this.obtenerUsuario();
    this.llenarMenu();
    this.menuActual = this._router.url;
    this.activarMenu(this._router.url);
    this._router.events
    .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      let currentRoute = event.urlAfterRedirects;
      this.activarMenu(currentRoute);
    });
  }

  llenarMenu() {
    const Rol = localStorage.getItem('id_rol');
      if (Rol == 'Admin') {
        this.menu_items = [
          {
            titulo: "Sevicios",
            id: 1,
            icono: "bi bi-tools",
            ruta: "/inicio/servicios",
            active: false
          },
          {
            titulo: "Productos",
            id: 2,
            icono: "bi bi-shop",
            ruta: "/inicio/productos",
            active: false
          },
          {
            titulo: "Proformas",
            id: 3,
            icono: "bi bi-file-earmark-pdf-fill",
            ruta: "/inicio/proformas",
            active: false
          },
          {
            titulo: "Pedidos",
            id: 4,
            icono: "bi bi-cart-check-fill",
            ruta: "/inicio/pedidos",
            active: false
          },
          {
            titulo: "Reportes",
            id: 5,
            icono: "bi bi-file-earmark-excel-fill",
            ruta: "/inicio/reportes",
            active: false
          },
          {
            titulo: "Cerrar sesión",
            id: 6,
            icono: "bi bi-box-arrow-left",
            ruta: "/login",
            active: false
          },
        ]
      }
      else {
        this.menu_items = [
        {
            titulo: "Crear Usuario",
            id: 0,
            icono: "bi bi-person-fill-add",
            ruta: "/inicio/crear/usuario",
            active: false
          },
          {
            titulo: "Reportes",
            id: 2,
            icono: "bi bi-file-earmark-excel-fill",
            ruta: "/inicio/reportes",
            active: false
          },
          {
            titulo: "Cerrar sesión",
            id: 3,
            icono: "bi bi-box-arrow-left",
            ruta: "/login",
            active: false
          },
        ]
      }
  }

  activarMenu(currentRoute: string) {
    this.menu_items = this.menu_items.map((menu)=>{
      menu.active = menu.ruta == currentRoute;
      return menu
    });
  }

  cambioMenu(ruta: string) {
    if(ruta == '/login') {
      localStorage.clear();
    }
    if (this.menuActual == ruta) {
      window.location.reload()
    }
    this.menuActual = ruta;
    this._router.navigateByUrl(ruta);
  }

  obtenerUsuario() {
    const Rol = localStorage.getItem('id_rol');
    this.rol = Rol!;
    this._usuarioService.getDatos(Number(localStorage.getItem('id_user'))).subscribe(dataResponse => {
      if (dataResponse.codigo == "200") {
        this.nombreUsuario = dataResponse.data.nombres;
      }
    })
  }

}
