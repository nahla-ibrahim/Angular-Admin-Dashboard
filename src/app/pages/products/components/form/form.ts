import { Component, inject, input, output, signal } from '@angular/core';
import { Modal } from '../../../../shared/components/modal/modal';
import { ProductsServices } from '../../../../core/services/products-services';
import { ProductType } from '../../../../core/interface/products-types';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [Modal, NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  ngOnInit(): void {
    if (this.theProduct()) {
      this.productForm.setValue({
        title: this.theProduct()!.title,
        price: this.theProduct()!.price,
        category: this.theProduct()!.category,
        stock: this.theProduct()!.stock,
        brand: this.theProduct()!.brand,
      });
    }
    this.categoriesFunc();
  }
  formTitle = input<string>();
  close = output<void>();
  theProduct = input<ProductType | null>(null);
  productServices = inject(ProductsServices);
  toastr = inject(ToastrService);
  categories = signal<string[]>([]);

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]),
    stock: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    brand: new FormControl(''),
    category: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.productForm.get('title') as FormControl;
  }
  get price() {
    return this.productForm.get('price') as FormControl;
  }
  get category() {
    return this.productForm.get('category') as FormControl;
  }

  get stock() {
    return this.productForm.get('stock') as FormControl;
  }
  get brand() {
    return this.productForm.get('brand') as FormControl;
  }

  categoriesFunc() {
    this.productServices.getcategories().subscribe((res) => {
      this.categories.set(res);
      console.log(this.categories());
    });
  }

  submit() {
    if (!this.productForm.valid) {
      alert('Please fill all the required fields correctly');
      return;
    }
    this.close.emit();
    console.log(this.theProduct());

    if (this.theProduct()) {
      this.edit();
    } else {
      this.productServices.addNewProduct(this.productForm.value).subscribe({
        next: () => {
          this.toastr.success('Product Added Successfully', 'Success');
        },
        error: (err: Error) => {
          this.toastr.error('something wrong , please try again', 'failed');
        },
      });
    }
  }

  edit() {
    this.productServices
      .updateProduct(this.theProduct()?.id!, {
        title: this.title.value,
        price: this.price.value,
        stock: this.stock.value,
        brand: this.brand.value,
        category: this.category.value,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Product Updated Successfully', 'Success');
        },
        error: (err: Error) => {
          this.toastr.error('Product Failed To Update', 'Failed');
        },
      });
  }
}
