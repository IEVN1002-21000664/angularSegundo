import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren: () => import('./auth/features/auth.routes')
    },
    {
        path:'forms',
        loadChildren: () => import('./formulario/formulario.routes')
    },
    {
        path: '',
        loadComponent: ()=> import('./formulario/ejemplo1/ejemplo1.component')

    },
    {
        path: '*',
        redirectTo: ''
    }
];
