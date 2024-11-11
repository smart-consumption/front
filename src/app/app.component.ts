import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FormsModule, ReactiveFormsModule],
  template: `
    <app-nav-bar></app-nav-bar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {}