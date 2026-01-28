import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma:PrismaService){}
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct= await this.prisma.product.create({data:{
      ...createProductDto,
      price: Number(createProductDto.price),
      stock: Number(createProductDto.stock),
    }});
    return newProduct;
    } catch (error) {
      const DUPLICATE_SKU_CODE='P2002'
                  error.code
                  if(error.code==DUPLICATE_SKU_CODE){
                      throw new ConflictException("Need unique SKU for the item")
                  }
                  throw error;
    }
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({where:{id}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where:{id},
      data: {
        ...updateProductDto,
        price:Number(updateProductDto.price),
        stock:Number(updateProductDto.stock)
      },
    });
  }

  async remove(id: number) {
   try {
    await this.prisma.product.delete({where:{id}});
    return {"message":`deleted product id=${id}`}
  }
   catch (error) {
    return {"message":`failed to delete product id=${id}`};
   }} 
}
