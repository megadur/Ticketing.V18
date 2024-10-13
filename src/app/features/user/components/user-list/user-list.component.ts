import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { UserService } from '../../data/services/user.service';
import { User } from '../../data/types/user';
import { StarComponent } from '../../../../shared/star/star.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
    StarComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  pageTitle = 'User List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }

  filteredUsers: User[] = [];
  users: User[] = [];

  constructor(private userService: UserService) { }

  performFilter(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: User) =>
      user.name?.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the user name and tags
  performFilter2(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: User) =>
      user.name?.toLocaleLowerCase().indexOf(filterBy) !== -1 
  //  ||      (user.tags && user.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1))
  );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.userService.users().subscribe({
      next: users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      error: err => this.errorMessage = err
    });
  }
}
