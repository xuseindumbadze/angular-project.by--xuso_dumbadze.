import { Component, inject, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { Product } from '../../../models/product.modals';
import { Services } from '../../../core/services/services';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnDestroy {
  public getproducts = inject(Services);
  public allProducts = signal<Product[]>([]);
  public hasError = signal(false);
  public destroyed$ = new Subject();

  products = computed(() => this.allProducts());

  ngOnInit(): void {
    this.getproducts
      .productsAll()
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.allProducts.set(data.products);
        }),
        catchError(() => {
          this.hasError.set(true);
          return of('Error');
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}
