import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../model/account.model';

@Component({
  selector: 'app-my-datatable',
  templateUrl: './my-datatable.component.html',
  styleUrls: ['./my-datatable.component.scss'],
})
export class MyDatatableComponent implements OnInit {
  @Input() account: any[] = [];
  @Input() columns: any[] = [];
  @Input() searchBal = '';
  @Input() searchName = '';
  @Input() searchAge = '';
  @Input() searchGen = '';
  @Input() searchAddress = '';
  @Input() searchEmp = '';
  @Input() searchEmail = '';
  @Input() searchCity = '';
  @Input() searchState = '';
  @Output() Search = new EventEmitter();
  @Output() Delete = new EventEmitter();
  @Output() clickAdd = new EventEmitter();
  @Input() isOpenAddAccount: boolean | undefined;
  @Output() clickEdit = new EventEmitter();
  p: number = 1;
  constructor() {}

  ngOnInit(): void {}
  search() {
    this.Search.emit([
      this.searchName,
      this.searchGen,
      this.searchAddress,
      this.searchEmail,
    ]);
  }
  delete(item: any) {
    this.Delete.emit(item);
  }
  openAddAccount() {
    this.clickAdd.emit();
  }
  openEdit(acc: Account) {
    this.clickEdit.emit(acc);
  }
}
