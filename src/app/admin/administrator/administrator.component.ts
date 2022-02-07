import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'path';
import { AuthService } from 'src/app/auth.service';
import { productService } from '../products.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
@Injectable()
export class AdministratorComponent implements OnInit {
  public srcResult: any;
  public file:File
  public title:string
  public type:string
  public price:string
  public specification:string
  public photo:File
  public quantity=1
  public search :string
  public isAdmin=1
  private id=''
 
  constructor(public productService: productService, private authService:AuthService) { }

  ngOnInit(): void {
  }

    saveFile(event:Event){
      this.file = (event.target as HTMLInputElement).files[0]
      
    }

  onAddProduct(form: NgForm){
    if(form.invalid){
      return
    }
   else{
      this.productService.createProduct(form.value.title, form.value.price, form.value.specification, this.file, form.value.quantity, form.value.type)
    }
  }

 

  onSearchProduct(){
    if(!this.search){
      return
    }
    else{
      this.productService.searchProduct(this.search)
      this.srcResult = this.productService.getSearchedProd().subscribe(res=>{
        this.id=res._id
        console.log(res)
        this.title = res.title
        this.price = res.price
        this.specification = res.specification
        this.photo = res.photo
        this.quantity = res.quantity
        this.type = res.type
      })
      
    }

  }

  deleteProduct(){
    if(!this.search){
      return
    }
    else{
      window.confirm("Stergere va fi ireversibila")
        this.productService.deleteSearchProduct(this.title)
    }
  }

  updateSearchProduct(){
    if(!this.search){
      return
    }
    else{
        this.productService.updateSearchProduct(this.id,this.title, this.price, this.specification, this.photo, this.quantity.toString(), this.type)
    }
  }




}
