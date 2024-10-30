import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import ListOfferComponent from './components/list-offer/list-offer.component';
import AddOfferComponent from './components/add-offer/add-offer.component';
import { ReviewComponent } from './components/review/review.component';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UserListComponent },
  // Aquí agregarás las demás rutas cuando crees los componentes
  { path: 'productos', component: UserListComponent }, // Temporalmente apunta a UserList
  { path: 'ofertas', component: ListOfferComponent },
  { path: 'ofertas/crear-oferta', component: AddOfferComponent},
  { path: 'resenas', component: ReviewComponent },
  { path: 'tiendas', component: UserListComponent },   // Temporalmente apunta a UserList
];
