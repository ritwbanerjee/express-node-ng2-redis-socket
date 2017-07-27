import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS 
import { HomepageComponent } from './homepage/homepage.component';

// Route Configuration
export const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: '',
            component: HomepageComponent,
            outlet: '',
          }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class CoreRoutingModule {}
