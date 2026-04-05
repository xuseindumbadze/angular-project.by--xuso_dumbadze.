import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from "./features/product-page/products/products";
import { Headercomponent } from "./sheared/header/headercomponent/headercomponent";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Headercomponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-project');
}
