import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ticketing.V18';

  error$: Observable<string>= new Observable<string>();
  isLoading$: Observable<boolean>= new Observable<boolean>();

  //constructor(private store: Store<RootState>) {}

  ngOnInit() {
    //this.error$ = this.store.select(RootStoreSelectors.selectError);
    //this.isLoading$ = this.store.select(RootStoreSelectors.selectIsLoading);
    //this.store.dispatch(new UserStoreActions.LoadUsersAction());
    //this.store.dispatch(new TicketStoreActions.LoadTicketsAction());
  }
}
