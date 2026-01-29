import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private productService:ProductService){}

  async create(createOrderDto: CreateOrderDto) {
  console.log("SERVICE HIT", Date.now());

  return await this.prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: Number(createOrderDto.productId) },
    });

    if (!product) throw new Error("Product not found");
    if (product.stock < createOrderDto.quantity)
      throw new Error("Insufficient stock");

    const order = await tx.order.create({
      data: {
        customerName: createOrderDto.customerName,
        productId: product.id,
        quantity: createOrderDto.quantity,
      },
    });

    await tx.product.update({
      where: { id: product.id },
      data: {
        stock: { decrement: createOrderDto.quantity },
      },
    });

    return order;
  },
  {timeout:20000}
  );
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

  async update(id: number, updateOrderDto) {
    return await this.prisma.order.update({
      where: { id },
      data: { status: updateOrderDto.status },
    });
  }

  async remove(id: number) {
    //todo- update product before deletion
    return await this.prisma.order.delete({
      where: { id },
    });
  }
}
