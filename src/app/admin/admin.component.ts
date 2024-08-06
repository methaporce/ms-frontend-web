import { Component } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  productName: string = '';
  productPrice: number = 0;
  productStock: number = 0;
  productImage: string = '';

  categoryName: string = '';
  categories: any[] = [];
  selectedCategory: string = '';

  constructor(private categoriesService: CatalogService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  createCategory(): void {

    this.categoriesService.createCategory(this.categoryName).subscribe(() => {
      console.log('Categoría creada exitosamente');
    })

    this.categoryName = '';
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Error al cargar las categorías', error);
    });
  }

  deleteCategory(categoryId: any) {
    this.categories = this.categories.filter(category => category.id !== categoryId);

    this.categoriesService.deleteCategory(categoryId).subscribe(() => { 
      console.log(`Categoría eliminada: ${categoryId}`);
    })
  }  

   createProduct(): void {


    this.categoriesService.createProduct({

      name: this.productName,
      price: this.productPrice,
      stock: this.productStock,
      categoryId: this.selectedCategory,
      image: this.productImage

    }).subscribe(() => {
      console.log('Producto creado exitosamente');
    })

  }

}
