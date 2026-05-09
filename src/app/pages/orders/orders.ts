import { Component, inject, signal } from '@angular/core';
import { OrdersServices } from '../../core/services/orders-services';
import { ToastrService } from 'ngx-toastr';
import { OrdersType, OrderType } from '../../core/interface/orders-types';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table } from '../../shared/components/table/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AlertModal } from '../../shared/components/alert-modal/alert-modal';

@Component({
  selector: 'app-orders',
  imports: [Table, CommonModule, FormsModule, FaIconComponent, AlertModal],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  ordersService = inject(OrdersServices);

  ngOnInit(): void {
    this.getAllOrders();
  }

  page = 1;
  limit = 10;
  total = 0;
  toastr = inject(ToastrService);
  data = signal<OrderType[]>([]);
  delete = signal<boolean>(false);
  deleteAlert = signal<boolean>(false);
  thisOrder = signal<OrderType | null>(null);
  thisOrderId!: number;
  Trash = faTrash;
  pen = faPen;

  headers = [
    { key: 'userId', label: 'User' },
    { key: 'products.Title', label: 'Products and Quantity' },
    { key: 'totalProducts', label: 'Total Products' },
    { key: 'totalQuantity', label: 'Total Quantity' },
    { key: 'total', label: 'Total Price' },
    { key: 'actions', label: 'Delete' },
  ];

  getAllOrders(sort: { col: string; dir: 'asc' | 'desc' } = { col: 'userId', dir: 'asc' }) {
    const skip = (this.page - 1) * this.limit;
    this.ordersService.getAllOrders(this.limit, skip).subscribe({
      next: (res: OrdersType) => {
        this.data.set(res.carts);
        console.log(res.carts[0].products);

        this.total = res.total;
      },
      error: (err: Error) => {
        this.toastr.error('something wrong', 'failed');
      },
    });
  }

  ///////////pagination & search
  prevPage() {
    this.page--;
    this.getAllOrders();
  }
  nextPage() {
    this.page++;
    this.getAllOrders();
  }

  deleteOrders(data: OrderType) {
    this.delete.set(true);
    this.thisOrderId = data.id!;
  }
  confirmDelete() {
    this.ordersService.deleteOrder(this.thisOrderId).subscribe({
      next: () => {
        this.toastr.success('Order Deleted Successfully', 'Success');
        this.delete.set(false);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
