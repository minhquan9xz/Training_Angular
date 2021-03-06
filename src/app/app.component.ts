import { Component, OnInit, VERSION } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { Observable, Subject } from 'rxjs';
import {
  Account,
  createAccount,
  createParamSearch,
} from './core/model/account.model';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import * as faker from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount!: Account;
  searchBal = '';
  searchName = '';
  searchAge = '';
  searchGen = '';
  searchAddress = '';
  searchEmp = '';
  searchEmail = '';
  searchCity = '';
  searchState = '';

  columns = [
    {
      field: 'stt',
      label: 'STT',
    },
    {
      field: 'account_number',
      label: 'Số TK',
    },
    {
      field: 'balance',
      label: 'Số dư',
    },
    {
      field: 'fullname',
      label: 'Tên',
    },
    {
      field: 'age',
      label: 'Tuổi',
    },
    {
      field: 'gender',
      label: 'Giới tính',
    },
    {
      field: 'address',
      label: 'Địa chỉ',
    },
    {
      field: 'employer',
      label: 'Nhân viên',
    },
    {
      field: 'email',
      label: 'Email',
    },
    {
      field: 'city',
      label: 'City',
    },
    {
      field: 'state',
      label: 'State',
    },

    {
      field: 'action',
      label: 'Thao tác',
      textAlign: 'right',
    },
  ];

  constructor(private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }

  getAllAccount(): void {
    this.accountService
      .getAccounts(
        createParamSearch({
          balance: this.searchBal,
          last_name: this.searchName,
          address: this.searchAddress,
          gender: this.searchGen,
          email: this.searchEmail,
          start: 0,
          limit: 1000,
        })
      )
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.account = resp;
        },
        (err: Error) => {
          this.account = [];
        }
      );
  }

  openAddAccount(): void {
    this.isOpenAddAccount = true;
  }
  openEdit(acc: Account): void {
    setTimeout(() => {
      this.selectedAccount = acc;
      this.isOpenEditAccount = true;
    }, 1000);
  }

  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: this.selectedAccount?.age,
      lastname: this.selectedAccount?.lastname,
      firstname: this.selectedAccount?.firstname,
      city: this.selectedAccount?.city,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: this.selectedAccount?.gender,
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id,
    });

    this.accountService
      .editAccount(editedAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.getAllAccount();
          this.isOpenEditAccount = false;
        },
        (err: Error) => {
          this.account = [];
        }
      );
  }

  saveNew(): void {
    const newAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),

      age: this.selectedAccount?.age,
      lastname: this.selectedAccount?.lastname,
      firstname: this.selectedAccount?.firstname,
      city: this.selectedAccount?.address,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: this.selectedAccount?.gender,
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id,
    });

    this.accountService
      .addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.getAllAccount();
          this.isOpenAddAccount = false;
        },
        (err: Error) => {
          this.account = [];
        }
      );
  }

  search(e: any): void {
    console.log('e', e);

    this.searchName = e[0];

    this.searchGen = e[1];
    this.searchAddress = e[2];

    this.searchEmail = e[3];

    this.getAllAccount();
  }
  Delete(acc: Account) {
    const delAccount = createAccount({
      ...acc,
    });

    this.accountService
      .deleteAccount(delAccount)

      .subscribe(
        (resp: any) => {
          this.getAllAccount();
          alert('Xác nhận xóa');
        },
        (err: Error) => {
          alert('Thất bại');
        }
      );
  }
  closeForm(e: any) {
    this.isOpenAddAccount = e;
    this.isOpenEditAccount = e;
  }
  saveOrEdit(e: Account) {
    this.selectedAccount = e;

    if (this.isOpenAddAccount == true) {
      setTimeout(() => {
        this.saveNew();
      }, 1000);
    }
    if (this.isOpenEditAccount == true) {
      setTimeout(() => {
        this.saveEdit();
      }, 1000);
    }
  }
}
