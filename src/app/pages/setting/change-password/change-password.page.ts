import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  isOldPassword = true;

  viewObject: {
    confirmPassword: ''
  };

  constructor() { }

  ngOnInit() {
  }
  onSave() {
    console.log('nmsl');
  }
}