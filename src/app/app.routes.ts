import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'criancas',
    pathMatch: 'full',
  },
  {
    path: 'criancas',
    loadComponent: () => import('./pages/criancas/criancas.page').then( m => m.CriancasPage)
  },
  {
    path: 'crianca-detalhe/:id',
    loadComponent: () => import('./pages/crianca-detalhe/crianca-detalhe.page').then( m => m.CriancaDetalhePage)
  },
  {
    path: 'campanhas',
    loadComponent: () => import('./pages/campanhas/campanhas.page').then( m => m.CampanhasPage)
  },
];
