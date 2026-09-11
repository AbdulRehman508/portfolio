import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Abdul Rehman — Software Engineer & Sr. Angular Developer',
  },
  { path: '**', redirectTo: '' },
];
