import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInput} from "@angular/material/chips";
@Component({
  selector: 'app-form-builder-auto-complete',
  standalone:true,
  templateUrl: './form-builder-auto-complete.component.html',
  styleUrls: ['./form-builder-auto-complete.component.scss'],
  imports :[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatProgressSpinnerModule,
  ]
})
export class FormBuilderAutoCompleteComponent {

  @ViewChild('chipInput') chipInput: any;

  @Input() item: any;
  @Input() acStatus: any;
  @Input() acSelected: any;
  @Input() acOptions: any;
  @Input() acOptionValues: any;
  @Input() form?: FormGroup;
  // @Input() canAddAc: any;
  @Output() addAutoComplete: EventEmitter<any> = new EventEmitter<any>();

  removeAutoComplete(field: any, item: any): void {
    this.acSelected[item?.formControlName].delete(field);
    if (this.canAddAc(item)) this.form?.get(item?.formControlName)?.enable(); else  this.form?.get(item?.formControlName)?.disable();
  }

  canAddAc(field: any): boolean {
    return field?.type !== 'autoComplete' || (field?.acMulti || this.acSelected[field?.formControlName]?.size < 1)
  }

  addAutoCompleteEmit(event: any){
    this.addAutoComplete.emit(event);
    this.chipInput.nativeElement.value = '';
  }
}
