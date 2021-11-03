import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PortfolioActions, PortfolioSelectors } from '../../store';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss'],
})
export class AddPortfolioComponent implements OnInit {
  form: FormGroup;
  creationProcessing$ = this.store.select(
    PortfolioSelectors.processingCreatePortfolio
  );
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPortfolioComponent>,
    private store: Store
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      isMain: [null],
    });
    const $ = this.store.select(PortfolioSelectors.CreatedPortfolio).subscribe({
      next: (res) => {
        if (res) {
          this.dialogRef.close(true);
          $.unsubscribe();
        }
      },
    });
  }

  submit() {
    if (!!this.form.valid) {
      this.store.dispatch(
        PortfolioActions.RequestCreatePortfolio({ payload: this.form.value })
      );
    }
  }
}
