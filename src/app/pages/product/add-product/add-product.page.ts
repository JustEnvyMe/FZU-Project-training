import { Product } from './../product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit, OnDestroy {

  product: Product;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private alertCtrl: AlertController,
    private categoryService: CategoryService
  ) {
    this.subscription = categoryService.watchCategory().subscribe(
      (activeCategory) => {
      },
      (error) => {
      }
      );
   }

  ngOnInit() {
  }

  private initProduct(): void {
    this.product = {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '',
      images: [],
      price: null,
      purchasePrice: null, // 进价
      inventory: null, // 库存
      standard: '', // 规格
      remark: ''
    };
  }

  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.initProduct();
          this.product.categoryName = '默认分类';
          // this.product.supplier.name = '输入商品供应商';
        } else {
          this.router.navigateByUrl('/productList');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    }

}