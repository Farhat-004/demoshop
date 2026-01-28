import {  Min } from "class-validator";

export class CreateProductDto {

  name: string;


  @Min(0)
  price: number;

 
  @Min(0)
  stock: number;

  sku: string;


  image: string;
}
