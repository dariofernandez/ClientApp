import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})

export class TextInputComponent implements 
       OnInit, ControlValueAccessor {
    
  //  ControlValueAccessor:  bridges from Angular API (such as input) to DOM

  /*  Angular needs a generic mechanism to stand between Angular’s formControl and
       a native/custom form control. This is where the ControlValueAccessor object
        comes into play. 
        This is the object that stands between the Angular formControl and 
        a native form control and synchronizes values between the two.
  
     Note: when you work with forms, a FormControl is always created regardless
      of whether you use template driven or reactive forms. 
      With the reactive approach, you create a control yourself explicitly and 
      use formControl or formControlName directive to bind it to a native control. 

      If you use template driven approach, the FormControl is created implicitly by 
      the NgModel directive
  
      @ViewChild('input', { static: true }) myInput: ElementRef;
          the 'input' refers to #input in text-input.component.html
          the myInput has access to the native control properties 
        (see https://www.pluralsight.com/guides/querying-the-dom-with-@viewchild-and-@viewchildren)
  */

  @ViewChild('input', { static: true }) myinput: ElementRef;

  // the next 2 are variables used in text-input.component.html
  @Input() type = 'text';
  @Input() label: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    
    const control = this.controlDir.control;  // get itself
    
    const validators = control.validator ? 
                                [control.validator] : []; 
    const asyncValidators = control.asyncValidator ? 
                           [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  
  onChange(event) { }

  onTouched() { }

  writeValue(obj: any): void {
    // The writeValue method is used by formControl 
    //    to set the value to the native form control.
    this.myinput.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    // the registerOnChange method is used by formControl 
    //  to register a callback that is expected to be triggered 
    //   every time the native form control is updated.
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}