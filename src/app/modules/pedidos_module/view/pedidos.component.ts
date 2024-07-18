import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../services/pedido.service';
import { Pedido, Cliente, Producto } from '../models/pedidos';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoDialogComponent } from '../component/PedidoDialogComponent';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cliente', 'tipo', 'fecha', 'producto', 'acciones'];
  dataSource!: MatTableDataSource<Pedido>;
  pedido: Pedido | null = null;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  selectedCliente: number | null = null;
  selectedProducto: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pedidoService: PedidoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerPedidos();
    this.obtenerClientes();
    this.obtenerProductos();
  }

  obtenerPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe(
      response => {
        if (response.codigo === '200') {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.applyFilters();
        }
      },
      error => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  obtenerClientes(): void {
    this.pedidoService.getClientes().subscribe(
      response => {
        if (response.codigo === '200') {
          this.clientes = response.data;
        }
      },
      error => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  obtenerProductos(): void {
    this.pedidoService.getProductos().subscribe(
      response => {
        if (response.codigo === '200') {
          this.productos = response.data;
        }
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  openDialog(pedido: Pedido | null = null): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '400px',
      data: { pedido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerPedidos();
      }
    });
  }

  eliminarPedido(id: number): void {
    this.pedidoService.eliminarPedido(id).subscribe(
      response => {
        if (response.codigo === '200') {
          this.obtenerPedidos();
        }
      },
      error => {
        console.error('Error al eliminar el pedido:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilters() {
    this.dataSource.filterPredicate = (data: Pedido, filter: string) => {
      let filterResult = true;
      if (this.selectedCliente !== null) {
        filterResult = filterResult && data.idCliente === this.selectedCliente;
      }
      if (this.selectedProducto !== null) {
        filterResult = filterResult && data.idProducto === this.selectedProducto;
      }
      return filterResult;
    };

    this.dataSource.filter = '' + Math.random(); // trigger the filter
  }

  onClienteChange() {
    this.applyFilters();
  }

  onProductoChange() {
    this.applyFilters();
  }
}
