import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import ListOfferComponent from './components/list-offer/list-offer.component';
import AddOfferComponent from './components/add-offer/add-offer.component';
import { ReviewComponent } from './components/review/review.component';
import {WatchlistComponent} from './components/watchlist/watchlist.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import CreateProductComponent from './components/product/create-product/create-product.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'productos', component: ListProductComponent , canActivate: [AuthGuard]},
  { path: 'ofertas', component: ListOfferComponent, canActivate: [AuthGuard]},
  { path: 'ofertas/crear-oferta', component: AddOfferComponent, canActivate: [AuthGuard]},
  { path: 'resenas', component: ReviewComponent, canActivate: [AuthGuard]},
  { path: 'tiendas', component: UserListComponent, canActivate: [AuthGuard]}, // Temporalmente apunta a UserList
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard]},
  { path: 'productos/crear', component: CreateProductComponent, canActivate: [AuthGuard]}

];
