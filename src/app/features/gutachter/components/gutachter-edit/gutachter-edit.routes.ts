import {Route} from '@angular/router'
import { GutachterService } from '../../data/services/gutachter.service'
import { GutachterEditComponent } from './gutachter-edit.component'


export const routes: Route[] = [
  {
    path: '',
    component: GutachterEditComponent,
    providers: [
      GutachterService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
