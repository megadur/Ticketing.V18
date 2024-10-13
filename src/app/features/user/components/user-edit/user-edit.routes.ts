import {Route} from '@angular/router'
import { UserService } from '../../data/services/user.service'
import { UserEditComponent } from './user-edit.component'


export const routes: Route[] = [
  {
    path: '',
    component: UserEditComponent,
    providers: [
      UserService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
