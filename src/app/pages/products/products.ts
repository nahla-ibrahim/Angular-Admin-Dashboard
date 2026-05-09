import { Component, inject, signal } from '@angular/core';
import { ProductsServices } from '../../core/services/products-services';
import { FormsModule } from '@angular/forms';
import { Table } from '../../shared/components/table/table';
import { ProductType, ProductsType } from '../../core/interface/products-types';
import { ToastrService } from 'ngx-toastr';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Form } from './components/form/form';
import { AlertModal } from '../../shared/components/alert-modal/alert-modal';

@Component({
  selector: 'app-products',
  imports: [FormsModule, Table, FaIconComponent, Form, AlertModal],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  productService = inject(ProductsServices);

  ngOnInit(): void {
    this.getAllProducts();
  }

  page = 1;
  limit = 10;
  total = 0;
  toastr = inject(ToastrService);
  data = signal<ProductType[]>([]);
  searchInput: string = '';
  isModalOpen = signal<boolean>(false);
  isUpdateModalOpen = signal<boolean>(false);
  delete = signal<boolean>(false);
  deleteAlert = signal<boolean>(false);
  thisProduct = signal<ProductType | null>(null);
  thisUserId!: number;
  Trash = faTrash;
  pen = faPen;

  headers = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true },
    { key: 'stock', label: 'Stock', sortable: true },
    { key: 'brand', label: 'brand', sortable: true },
    { key: 'actions', label: 'Actions' },
  ];

  getAllProducts(sort: { col: string; dir: 'asc' | 'desc' } = { col: 'id', dir: 'asc' }) {
    const skip = (this.page - 1) * this.limit;
    this.productService
      .getAllProducts(this.limit, skip, this.searchInput, sort.col, sort.dir)
      .subscribe({
        next: (res: ProductsType) => {
          this.data.set(res.products);
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
    this.getAllProducts();
  }
  nextPage() {
    this.page++;
    this.getAllProducts();
  }

  search() {
    this.page = 1;
    this.getAllProducts();
  }

  add() {
    this.isModalOpen.set(true);
  }

  deleteProduct(data: ProductType) {
    this.delete.set(true);
    this.thisUserId = data.id!;
  }
  confirmDelete() {
    this.productService.deleteProduct(this.thisUserId).subscribe({
      next: () => {
        this.toastr.success('User Deleted Successfully', 'Success');
        this.delete.set(false);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
