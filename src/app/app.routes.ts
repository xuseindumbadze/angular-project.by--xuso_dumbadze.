import { Routes } from '@angular/router';
import { Products } from './features/product-page/products/products';
import { Profile } from './features/profile/profile/profile';

export const routes: Routes = [
  { path: '', component: Products },
  { path: 'profile', component: Profile },
];
