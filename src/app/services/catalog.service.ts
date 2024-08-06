import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private baseUrl = '/api/v1';

  private serviceCategory = '/catalog/category';

  private serviceProduct = '/catalog/product';

  private api = environment.microserviceCatalog + this.baseUrl;

  constructor(private http: HttpClient) {}

  createCategory(categoryName: String): Observable<any> {
    const body = { name: categoryName };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.api}${this.serviceCategory}/create`, body);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.api}${this.serviceCategory}/all`);
  }

  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete(
      `${this.api}${this.serviceCategory}/delete/${categoryId}`
    );
  }

  createProduct(product: any): Observable<any> {

    const body = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: {
        id: product.categoryId
      },
      pathImage: product.image
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.api}${this.serviceProduct}/create`, body);
  }
}
