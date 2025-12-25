import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Home } from './public/home/home';
import { Products } from './public/products/products';
import { ProductDetail } from './public/product-detail/product-detail';
import { Contact } from './public/contact/contact';
import { Login } from './admin/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { ManageProducts } from './admin/manage-products/manage-products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    data: { title: 'Home - KANCHU.IN' }
  },
  {
    path: 'products',
    component: Products,
    data: { title: 'Products - KANCHU.IN' }
  },
  {
    path: 'products/:id',
    component: ProductDetail,
    data: { title: 'Product Details - KANCHU.IN' }
  },
  {
    path: 'contact',
    component: Contact,
    data: { title: 'Contact Us - KANCHU.IN' }
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: Login,
        data: { title: 'Admin Login - KANCHU.IN' }
      },
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
        data: { title: 'Dashboard - KANCHU.IN' }
      },
      {
        path: 'manage-products',
        component: ManageProducts,
        canActivate: [authGuard],
        data: { title: 'Manage Products - KANCHU.IN' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
