import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';

export const routes: Routes = [
    { path: 'welcome', component: HomeComponent },
    {
        path: 'tickets',
        loadComponent: () =>
            import('./features/ticket/components/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
                
    },
    {
        path: 'tickets/:id',
        loadChildren: () =>
            import('./features/ticket/components/ticket-detail/ticket-detail.routes').then((m) => m.routes),
    },
    {
        path: 'tickets/:id/edit',
        loadChildren: () =>
            import('./features/ticket/components/ticket-edit/ticket-edit.routes').then((m) => m.routes),
    },
    {
        path: 'users',
        loadComponent: () =>
            import('./features/user/components/user-list/user-list.component').then(m => m.UserListComponent)
                
    },
    {
        path: 'users/:id',
        loadChildren: () =>
            import('./features/user/components/user-detail/user-detail.routes').then((m) => m.routes),
    },
    {
        path: 'users/:id/edit',
        loadChildren: () =>
            import('./features/user/components/user-edit/user-edit.routes').then((m) => m.routes),
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
