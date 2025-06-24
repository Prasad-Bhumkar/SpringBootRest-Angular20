import { Routes } from '@angular/router';

import { ProductList } from './products/product-list/product-list';
import { ProductForm } from './products/product-form/product-form';
import { ProductDetails } from './products/product-details/product-details';

import { StudentList } from './students/student-list/student-list';
import { StudentForm } from './students/student-form/student-form';
import { StudentDetails } from './students/student-details/student-details';

export const routes: Routes = [
  // Product Routes
  { path: 'products', component: ProductList },
  { path: 'products/new', component: ProductForm },
  { path: 'products/edit/:id', component: ProductForm },
  { path: 'products/:id', component: ProductDetails },

  // Student Routes
  { path: 'students', component: StudentList },
  { path: 'students/new', component: StudentForm },
  { path: 'students/edit/:id', component: StudentForm },
  { path: 'students/:id', component: StudentDetails },

  // Default Route
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
