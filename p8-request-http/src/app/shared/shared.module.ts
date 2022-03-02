import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertModalComponent, ConfirmModalComponent],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent]
})
export class SharedModule { }
