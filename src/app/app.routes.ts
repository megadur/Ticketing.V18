import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';

export const routes: Routes = [
    { path: 'welcome', component: HomeComponent },
    {
        path: 'gutachtens',
        loadComponent: () =>
            import('./features/gutachten/components/gutachten-list/gutachten-list.component').then(m => m.GutachtenListComponent)
                
    },
    {
        path: 'gutachtens/:id',
        loadChildren: () =>
            import('./features/gutachten/components/gutachten-detail/gutachten-detail.routes').then((m) => m.routes),
    },
    {
        path: 'gutachtens/:id/edit',
        loadChildren: () =>
            import('./features/gutachten/components/gutachten-edit/gutachten-edit.routes').then((m) => m.routes),
    },
    {
        path: 'gutachters',
        loadComponent: () =>
            import('./features/gutachter/components/gutachter-list/gutachter-list.component').then(m => m.GutachterListComponent)
                
    },
    {
        path: 'gutachters/:id',
        loadChildren: () =>
            import('./features/gutachter/components/gutachter-detail/gutachter-detail.routes').then((m) => m.routes),
    },
    {
        path: 'gutachters/:id/edit',
        loadChildren: () =>
            import('./features/gutachter/components/gutachter-edit/gutachter-edit.routes').then((m) => m.routes),
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
