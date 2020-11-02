import { UserValidation } from './../user-validation';
import { AjaxResult } from './../../../shared/class/ajax-result';
import { PassportService } from './../passport.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: any = {
    identifier: '',
    password: ''
  };

  constructor(private toastController: ToastController,
    private passportService: PassportService,
    private alertController: AlertController) { }
  // 点击登录按钮时调用
  async onLogin(form: NgForm) {
    let toast: any;

    // 判断表单验证是否正确
    if (form.invalid) { // 如果不正确，create一个toast，显示3秒
      toast = await this.toastController.create({
        duration: 3000
      });
    }
    // 判断的代码省略，参考之前的任务自行补上下面代码
    if (form.controls.identifier.errors?.required) {
      toast.message = '请输入您的手机号码或者邮箱';
      toast.present();
      return;
    }

    const userValidation = new UserValidation();
    userValidation.identifier = this.login.identifier;
    userValidation.passworrdToken = this.login.password;


    this.passportService.login(userValidation).then((ajaxResult) => {
      if (ajaxResult.success) {
        // 验证成功，页面跳转
      } else {
        this.alertController.create({
          header: '警告',
          buttons: ['确定']
        }).then((alert) => {
          alert.message = ajaxResult.error.message;
          alert.present();
        });
      }
    });

  }


  // 点击忘记密码时调用
  onForgotPassword() {
    // 进入找回密码页面
  }

  ngOnInit() {
  }

}
