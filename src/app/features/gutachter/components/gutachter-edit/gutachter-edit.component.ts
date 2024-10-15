import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormArray, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, Observable, fromEvent, merge, debounceTime } from 'rxjs';
import { Gutachter } from '../../data/types/gutachter';
import { CommonModule } from '@angular/common';
import { GutachterService } from '../../data/services/gutachter.service';
import { GenericValidator } from '../../../../shared/validators/generic.validator';
import { NumberValidators } from '../../../../shared/validators/number.validator';

@Component({
  selector: 'app-gutachter-edit',
  standalone: true,
  imports: [
    CommonModule,
     RouterLink,
     FormsModule,
     ReactiveFormsModule,
 ],
  templateUrl: './gutachter-edit.component.html',
  styleUrl: './gutachter-edit.component.css'
})
export class GutachterEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]=[];

  pageTitle = 'Gutachter Edit';
  errorMessage: string='';
  gutachterForm: FormGroup;

  gutachter?: Gutachter;
  private sub?: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.gutachterForm?.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private gutachterService: GutachterService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      gutachterName: {
        required: 'Gutachter name is required.',
        minlength: 'Gutachter name must be at least three characters.',
        maxlength: 'Gutachter name cannot exceed 50 characters.'
      },
      gutachterCode: {
        required: 'Gutachter code is required.'
      },
      starRating: {
        range: 'Rate the gutachter between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.gutachterForm = this.fb.group({
      gutachterName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      gutachterCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });
  }

  ngOnInit(): void {

    // Read the gutachter Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id')!;
        this.getGutachter(id);
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
    merge(this.gutachterForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.gutachterForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getGutachter(id: number): void {
    this.gutachterService.gutachter(id)
      .subscribe({
        next: (gutachter: Gutachter| undefined) => this.displayGutachter(gutachter),
        error: err => this.errorMessage = err
      });
  }

  displayGutachter(gutachter: Gutachter| undefined): void {
    if (this.gutachterForm) {
      this.gutachterForm.reset();
    }
    this.gutachter = gutachter;

    if (this.gutachter?.id === 0) {
      this.pageTitle = 'Add Gutachter';
    } else {
      this.pageTitle = `Edit Gutachter: ${this.gutachter?.name}`;
    }

    // Update the data on the form
    this.gutachterForm.patchValue({
      gutachterName: this.gutachter?.name,
      starRating: this.gutachter?.starRating,
      description: this.gutachter?.description
    });
    this.gutachterForm.setControl('tags', this.fb.array(this.gutachter?.tags || []));
  }

  deleteGutachter(): void {
    if (this.gutachter?.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (this.gutachter!=null && confirm(`Really delete the gutachter: ${this.gutachter.name}?`)) {
        if (this.gutachter?.id !== undefined) {
          this.gutachterService.deleteGutachter(this.gutachter.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  }

  saveGutachter(): void {
    if (this.gutachterForm.valid) {
      if (this.gutachterForm.dirty) {
        const p = { ...this.gutachter, ...this.gutachterForm.value };

        if (p.id === 0) {
          this.gutachterService.createGutachter(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.gutachterService.updateGutachter(p)
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
    this.gutachterForm.reset();
    this.router.navigate(['/gutachters']);
  }
}

