import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { User } from '../../data/types/user';
import { StarComponent } from '../../../../shared/star/star.component';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StarComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  pageTitle = 'User Detail';
  errorMessage = '';
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getUser(id);
    }
  }

  getUser(id: number): void {
    this.userService.user(id).subscribe({
      next: (user: User | undefined) => this.user = user,
      error: (err: string) => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }

}
