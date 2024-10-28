import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UserListComponent },
  // Aquí agregarás las demás rutas cuando crees los componentes
  { path: 'productos', component: UserListComponent }, // Temporalmente apunta a UserList
  { path: 'ofertas', component: UserListComponent },   // Temporalmente apunta a UserList
  { path: 'resenas', component: UserListComponent },   // Temporalmente apunta a UserList
  { path: 'tiendas', component: UserListComponent },   // Temporalmente apunta a UserList
];