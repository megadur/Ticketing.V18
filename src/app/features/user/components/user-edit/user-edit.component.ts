import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormArray, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, Observable, fromEvent, merge, debounceTime } from 'rxjs';
import { User } from '../../data/types/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../data/services/user.service';
import { GenericValidator } from '../../../../shared/validators/generic.validator';
import { NumberValidators } from '../../../../shared/validators/number.validator';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
     RouterLink,
     FormsModule,
     ReactiveFormsModule,
 ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]=[];

  pageTitle = 'User Edit';
  errorMessage: string='';
  userForm: FormGroup;

  user?: User;
  private sub?: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.userForm?.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      userName: {
        required: 'User name is required.',
        minlength: 'User name must be at least three characters.',
        maxlength: 'User name cannot exceed 50 characters.'
      },
      userCode: {
        required: 'User code is required.'
      },
      starRating: {
        range: 'Rate the user between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.userForm = this.fb.group({
      userName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      userCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });
  }

  ngOnInit(): void {

    // Read the user Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id')!;
        this.getUser(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.userForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.userForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getUser(id: number): void {
    this.userService.user(id)
      .subscribe({
        next: (user: User| undefined) => this.displayUser(user),
        error: err => this.errorMessage = err
      });
  }

  displayUser(user: User| undefined): void {
    if (this.userForm) {
      this.userForm.reset();
    }
    this.user = user;

    if (this.user?.id === 0) {
      this.pageTitle = 'Add User';
    } else {
      this.pageTitle = `Edit User: ${this.user?.name}`;
    }

    // Update the data on the form
    this.userForm.patchValue({
      userName: this.user?.name,
      starRating: this.user?.starRating,
      description: this.user?.description
    });
    this.userForm.setControl('tags', this.fb.array(this.user?.tags || []));
  }

  deleteUser(): void {
    if (this.user?.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (this.user!=null && confirm(`Really delete the user: ${this.user.name}?`)) {
        if (this.user?.id !== undefined) {
          this.userService.deleteUser(this.user.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        const p = { ...this.user, ...this.userForm.value };

        if (p.id === 0) {
          this.userService.createUser(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.userService.updateUser(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.userForm.reset();
    this.router.navigate(['/users']);
  }
}

