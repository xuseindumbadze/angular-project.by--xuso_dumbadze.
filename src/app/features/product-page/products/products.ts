import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Product } from '../../../models/product.modals';
import { Services } from '../../../core/services/services';
import { catchError, finalize, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnDestroy {
  public getproducts = inject(Services);
  public platformId = inject(PLATFORM_ID);
  public products: Product[] | undefined;
  public hasError: boolean = false;
  public destroyed$ = new Subject();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.getproducts
      .productsAll()
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.products = data.products;
        }),
        catchError(() => {
          this.hasError = true;
          return of('Error');
        }),
        finalize(() => {
          console.log('final');
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
