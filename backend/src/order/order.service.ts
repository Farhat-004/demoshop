import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private productService:ProductService){}

  async create(createOrderDto: CreateOrderDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: createOrderDto.productId },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }
    if (product.stock < createOrderDto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const stockUpdate = await this.prisma.product.updateMany({
      where: {
        id: product.id,
        stock: { gte: createOrderDto.quantity },
      },
      data: {
        stock: { decrement: createOrderDto.quantity },
      },
    });

    if (stockUpdate.count === 0) {
      throw new BadRequestException('Insufficient stock');
    }

    return this.prisma.order.create({
      data: {
        customerName: createOrderDto.customerName,
        productId: product.id,
        quantity: createOrderDto.quantity,
      },
    });
  }


  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
            price: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  async update(id: string, updateOrderDto) {
    return await this.prisma.order.update({
      where: { id },
      data: { status: updateOrderDto.status },
    });
  }

  async remove(id: string) {
    //todo- update product before deletion
    return await this.prisma.order.delete({
      where: { id },
    });
  }
}
