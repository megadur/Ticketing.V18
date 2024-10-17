import { Route } from '@angular/router'
import { GutachtenService } from '../../data/services'
import { GutachtenEditComponent } from './gutachten-edit.component'



export const routes: Route[] = [
  {
    path: '',
    component: GutachtenEditComponent,
    providers: [
      GutachtenService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
