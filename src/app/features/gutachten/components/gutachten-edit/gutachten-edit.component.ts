import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormArray, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, Observable, fromEvent, merge, debounceTime } from 'rxjs';
import { GenericValidator } from '../../../../shared/validators/generic.validator';
import { NumberValidators } from '../../../../shared/validators/number.validator';
import { Gutachten } from '../../data/types/gutachten';
import { GutachtenService } from '../../data/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gutachten-edit',
  standalone: true,
  imports: [
    CommonModule,
     RouterLink,
     FormsModule,
     ReactiveFormsModule,
 ],
  templateUrl: './gutachten-edit.component.html',
  styleUrl: './gutachten-edit.component.css'
})
  export class GutachtenEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]=[];
  
    pageTitle = 'Gutachten Edit';
    errorMessage: string='';
    gutachtenForm: FormGroup;
  
    Gutachten?: Gutachten;
    private sub?: Subscription;
  
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
  
    get tags(): FormArray {
      return this.gutachtenForm?.get('tags') as FormArray;
    }
  
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private gutachtenService: GutachtenService) {
  
      // Defines all of the validation messages for the form.
      // These could instead be retrieved from a file or database.
      this.validationMessages = {
        Description: {
          required: 'Gutachten name is required.',
          minlength: 'Gutachten name must be at least three characters.',
          maxlength: 'Gutachten name cannot exceed 50 characters.'
        },

      };
  
      // Define an instance of the validator for use with this form,
      // passing in this form's set of validation messages.
      this.genericValidator = new GenericValidator(this.validationMessages);
      this.gutachtenForm = this.fb.group({
        Description: ['', [Validators.required,
                           Validators.minLength(3),
                           Validators.maxLength(50)]],
      });
    }
  
    ngOnInit(): void {
  
      // Read the Gutachten Id from the route parameter
      this.sub = this.route.paramMap.subscribe(
        params => {
          const id = +params.get('id')!;
          this.getGutachten(id);
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
      merge(this.gutachtenForm.valueChanges, ...controlBlurs).pipe(
        debounceTime(800)
      ).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.gutachtenForm);
      });
    }
  
    addTag(): void {
      this.tags.push(new FormControl());
    }
  
    deleteTag(index: number): void {
      this.tags.removeAt(index);
      this.tags.markAsDirty();
    }
  
    getGutachten(id: number): void {
      this.gutachtenService.gutachten(id)
        .subscribe({
          next: (Gutachten: Gutachten | undefined) => {
            if (Gutachten) {
              this.displayGutachten(Gutachten);
            } else {
              this.errorMessage = 'Gutachten not found';
            }
          },
          error: err => this.errorMessage = err
        });
    }
  
    displayGutachten(Gutachten: Gutachten): void {
      if (this.gutachtenForm) {
        this.gutachtenForm.reset();
      }
      this.Gutachten = Gutachten;
  
      if (this.Gutachten.id === 0) {
        this.pageTitle = 'Add Gutachten';
      } else {
        this.pageTitle = `Edit Gutachten: ${this.Gutachten.description}`;
      }
  
      // Update the data on the form
      this.gutachtenForm.patchValue({
        Description: this.Gutachten.description,
      });
    }
  
    deleteGutachten(): void {
      if (this.Gutachten?.id === 0) {
        // Don't delete, it was never saved.
        this.onSaveComplete();
      } else {
        if (this.Gutachten!=null && confirm(`Really delete the Gutachten: ${this.Gutachten.description}?`)) {
          if (this.Gutachten?.id !== undefined) {
            this.gutachtenService.delete(this.Gutachten.id)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      }
    }
    }
  
    saveGutachten(): void {
      if (this.gutachtenForm.valid) {
        if (this.gutachtenForm.dirty) {
          const p = { ...this.Gutachten, ...this.gutachtenForm.value };
  
          if (p.id === 0) {
            this.gutachtenService.newGutachten(p)
              .subscribe({
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
          } else {
            this.gutachtenService.update(p)
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
      this.gutachtenForm.reset();
      this.router.navigate(['/Gutachtens']);
    }
  }
  
  