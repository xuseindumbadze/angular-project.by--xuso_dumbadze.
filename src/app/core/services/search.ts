import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsResponse } from '../../models/product.modals';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  private readonly BASE = 'https://api.everrest.educata.dev/shop/products/search';

  search(keywords: string) {
    return this.http.get<ProductsResponse>(this.BASE, {
      params: { keywords, page_index: 0, page_size: 8 }
    });
  }
}
