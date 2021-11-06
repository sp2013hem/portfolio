import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
})
export class SharedModule {}
