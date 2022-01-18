import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'path';
import { productService } from '../products.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
@Injectable()
export class AdministratorComponent implements OnInit {
  public srcResult: any;
 
  constructor(public productService: productService) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm){
    if(form.invalid){
      return
    }
   else{
      this.productService.createProduct(form.value.title, form.value.price, form.value.specification, form.value.photo, form.value.quantity, form.value.type)
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
