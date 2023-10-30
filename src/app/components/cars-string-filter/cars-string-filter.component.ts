import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cars-string-filter',
  templateUrl: './cars-string-filter.component.html',
  styleUrls: ['./cars-string-filter.component.css']
})

export class CarsStringFilterComponent {
  @Input() label: string = "";
  @Input() regexpr: string = '.*';
  @Input() isEnabled = false;
  @Input() value: string = "";
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() isEnabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  emitValueChange() {
    this.valueChange.emit(this.value);
  }

  emitIsEnabledChange() {
    this.isEnabledChange.emit(this.isEnabled);
  }

  validateInput(): void {
    const regex = new RegExp(this.regexpr);
    if (!regex.test(this.value)) {
      this.value = '';
      this.emitValueChange();
    }
  }
}
