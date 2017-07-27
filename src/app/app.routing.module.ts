import { Routes,RouterModule } from '@angular/router';
const appRoutes : Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path : 'home',
        loadChildren: '../core/core.module#CoreModule'
    }

];

export const appRouting = RouterModule.forRoot(appRoutes);
 