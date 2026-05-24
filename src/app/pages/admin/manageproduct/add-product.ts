import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../models/product';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProduct {
  productForm: FormGroup;
  products: any[] = [];
  showForm: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  isEdit = false;
  editId = 0;
  displayedColumns: string[] = [
    'name',
    'description',
    'quantity',
    'price',
    'image',
    'actions'
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService, private cd: ChangeDetectorRef, private notification: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: [
        '',
        Validators.required
      ],
      price: [
        '',
        Validators.required
      ],
      quantity: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.required
      ]
    });
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.isEdit = false;
        this.editId = 0;
        this.showForm = false;
        this.cd.detectChanges();
      }
    });
  }
  submitForm() {
    if (this.productForm.invalid) {
      return;
    }
    if (!this.selectedFile) {
      this.notification.error("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('description', this.productForm.value.description);
    formData.append('quantity', this.productForm.value.quantity);

    formData.append('image', this.selectedFile);
    if (this.isEdit) {
      this.productService.updateProduct(this.editId, formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.notification.success(res.message);
            this.loadProducts();
          }
        },
        error: (err) => {

          console.log(err);
        }
      });
    }
    else {
      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.notification.success(res.message);
            this.loadProducts();
          }
        },
        error: (err) => {

          console.log(err);
        }
      });
    }
    
  
  }

  editProduct(product: Product) {
    this.isEdit = true;
    this.editId = product.id;
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity
    });
    this.isEdit = true;
    this.selectedFileName = '';
    this.showForm = true;

  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        this.notification.success(res.message);
        this.loadProducts();
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }
  openAddForm() {
    this.isEdit = false;
    this.productForm.reset(); 
    this.selectedFileName = '';
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
    this.productForm.reset();
  }
}
