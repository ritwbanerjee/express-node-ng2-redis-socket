import { Routes,RouterModule } from '@angular/router';
const appRoutes : Routes = [
    {
        path: '',
        loadChildren: '../core/core.module#CoreModule'
    },
    {
        path : 'home',
        loadChildren: '../core/core.module#CoreModule'
    }

];

export const appRouting = RouterModule.forRoot(appRoutes);
 