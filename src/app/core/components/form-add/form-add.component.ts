import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../model/account.model';
@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss'],
})
export class FormAddComponent implements OnInit {
  myForm!: FormGroup;
  @Input() isOpenAddAccount: boolean | undefined;
  @Output() clickSubmit = new EventEmitter();
  @Input() selectedAccount!: Account;
  @Input() isOpenEditAccount: boolean | undefined;
  @Output() clickCloseForm = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      _id: [''],
      account_number: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      gender: '',
      address: ['', Validators.required],
      employer: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
          ),
        ],
      ],
      city: [''],
      state: [''],
    });

    if (this.isOpenEditAccount == true) {
      this.myForm.patchValue({
        _id: this.selectedAccount._id,
        account_number: this.selectedAccount.account_number,
        firstname: this.selectedAccount.firstname,
        lastname: this.selectedAccount.lastname,
        age: this.selectedAccount.age,
        gender: this.selectedAccount.gender,
        address: this.selectedAccount.address,
        employer: this.selectedAccount.employer,
        email: this.selectedAccount.email,
        city: this.selectedAccount.email,
        state: this.selectedAccount.state,
      });
    }
  }
  closeForm() {
    this.myForm.reset();
    this.clickCloseForm.emit(false);
  }
  onSubmit() {
    console.log('aa');

    if (this.myForm.valid) {
      this.clickSubmit.emit(this.myForm.value);
      alert('Thành công');
    } else {
      for (let i in this.myForm.controls) {
        this.myForm.controls[i].markAsTouched();
      }
    }
  }
}
