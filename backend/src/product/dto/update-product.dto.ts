import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    
      name: string;
    
    
     
      price: number;
    
     
  
      stock: number;
    
    
      image: string;
}
