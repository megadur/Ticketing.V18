import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GutachterDetailComponent } from './components/gutachter-detail/gutachter-detail.component';
import { GutachterListComponent } from './components/gutachter-list/gutachter-list.component';
import { GutachterEditComponent } from './components/gutachter-edit/gutachter-edit.component';

const routes: Routes = [
  { path: 'gutachters', component: GutachterListComponent },
  { path: 'gutachters/:id', component: GutachterDetailComponent },
  {
    path: 'gutachters/:id/edit',
    //canDeactivate: [GutachterEditGuard],
    component: GutachterEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GutachterRoutingModule { }
