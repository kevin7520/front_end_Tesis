import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../services/pedido.service';
import { Cliente, Producto, CreatePedido, UpdatePedido, Pedido } from '../models/pedidos';

@Component({
  selector: 'app-pedido-dialog',
  templateUrl: './pedido-dialog.component.html',
})
export class PedidoDialogComponent implements OnInit {
  pedidoForm!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];

  constructor(
    public dialogRef: MatDialogRef<PedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pedido: Pedido | null },
    private fb: FormBuilder,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      idCliente: [this.data.pedido ? this.data.pedido.idCliente : '', Validators.required],
      tipoPedido: [this.data.pedido ? this.data.pedido.tipoPedido : '', Validators.required],
      fechaPedido: [this.data.pedido ? this.data.pedido.fechaPedido : '', Validators.required],
      idProducto: [this.data.pedido ? this.data.pedido.idProducto : '', Validators.required],
      detalles: this.fb.array(
        this.data.pedido ? this.data.pedido.detalles.map(detalle => this.fb.group({
          cantidad: [detalle.cantidad, Validators.required],
          descripcionRepuesto: [detalle.descripcionRepuesto, Validators.required]
        })) : []
      )
    });

    this.pedidoService.getClientes().subscribe(response => {
      if (response.codigo === '200') {
        this.clientes = response.data;
      }
    });

    this.pedidoService.getProductos().subscribe(response => {
      if (response.codigo === '200') {
        this.productos = response.data;
      }
    });
  }

  get detalles(): FormArray {
    return this.pedidoForm.get('detalles') as FormArray;
  }

  addDetalle() {
    this.detalles.push(this.fb.group({
      cantidad: ['', Validators.required],
      descripcionRepuesto: ['', Validators.required]
    }));
  }

  removeDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  onSubmit(): void {
    if (this.pedidoForm.invalid) {
      return;
    }

    const pedidoData = this.pedidoForm.value;
    if (this.data.pedido) {
      const updatePedido: UpdatePedido = {
        idPedido: this.data.pedido.idPedido,
        ...pedidoData
      };
      this.pedidoService.actualizarPedido(this.data.pedido.idPedido, updatePedido).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      const createPedido: CreatePedido = pedidoData;
      this.pedidoService.crearPedido(createPedido).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
