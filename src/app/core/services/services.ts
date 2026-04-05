import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse, Category, Price } from '../../models/product.modals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Services {

  public http = inject(HttpClient)

  productsAll(){
    return this.http.get<ProductsResponse>("https://api.everrest.educata.dev/shop/products/all")
  }
}
