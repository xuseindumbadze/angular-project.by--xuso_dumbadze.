import { Component, inject, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { Product, Category } from '../../../models/product.modals';
import { Services } from '../../../core/services/services';
import { catchError, of, Subject, takeUntil, tap, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnDestroy {
  private svc = inject(Services);
  private destroyed$ = new Subject<void>();

  // raw data
  allProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  brands = signal<string[]>([]);
  hasError = signal(false);

  // filter state
  selectedCategory = signal<string | null>(null);
  selectedBrand = signal<string | null>(null);
  selectedRating = signal<number | null>(null);
  priceMin = signal<number>(0);
  priceMax = signal<number>(8000);

  // accordion open state
  categoryOpen = signal(false);
  brandOpen = signal(false);
  ratingOpen = signal(false);
  priceOpen = signal(false);

  // temp price inputs (apply on button click)
  tempPriceMin = 0;
  tempPriceMax = 8000;

  // computed filtered list
  products = computed(() => {
    let list = this.allProducts();

    const cat = this.selectedCategory();
    if (cat) list = list.filter(p => p.category.id === cat);

    const brand = this.selectedBrand();
    if (brand) list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());

    const rating = this.selectedRating();
    if (rating !== null) list = list.filter(p => p.rating >= rating);

    const min = this.priceMin();
    const max = this.priceMax();
    list = list.filter(p => p.price.current >= min && p.price.current <= max);

    return list;
  });

  ngOnInit() {
    forkJoin({
      products: this.svc.productsAll(),
      categories: this.svc.getCategories(),
      brands: this.svc.getBrands(),
    }).pipe(
      takeUntil(this.destroyed$),
      tap(({ products, categories, brands }) => {
        this.allProducts.set(products.products);
        this.categories.set(categories);
        this.brands.set(brands);
      }),
      catchError(() => {
        this.hasError.set(true);
        return of(null);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  selectCategory(id: string) {
    this.selectedCategory.set(this.selectedCategory() === id ? null : id);
  }

  selectBrand(brand: string) {
    this.selectedBrand.set(this.selectedBrand() === brand ? null : brand);
  }

  selectRating(r: number) {
    this.selectedRating.set(this.selectedRating() === r ? null : r);
  }

  applyPrice() {
    this.priceMin.set(this.tempPriceMin);
    this.priceMax.set(this.tempPriceMax);
  }

  resetAll() {
    this.selectedCategory.set(null);
    this.selectedBrand.set(null);
    this.selectedRating.set(null);
    this.priceMin.set(0);
    this.priceMax.set(8000);
    this.tempPriceMin = 0;
    this.tempPriceMax = 8000;
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}
