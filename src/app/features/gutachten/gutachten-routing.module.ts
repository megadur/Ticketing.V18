import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GutachtenDetailComponent } from './components/gutachten-detail/gutachten-detail.component';
import { GutachtenListComponent } from './components/gutachten-list/gutachten-list.component';
import { GutachtenEditComponent } from './components/gutachten-edit/gutachten-edit.component';

const routes: Routes = [
  { path: 'gutachtens', component: GutachtenListComponent },
  { path: 'gutachtens/:id', component: GutachtenDetailComponent },
  {
    path: 'gutachtens/:id/edit',
    //canDeactivate: [GutachtenEditGuard],
    component: GutachtenEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GutachtenRoutingModule { }
