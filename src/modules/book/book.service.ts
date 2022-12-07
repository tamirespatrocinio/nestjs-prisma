import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(private prismaClient: PrismaService) {}

  async create(data: BookDTO) {
    const bookExists = await this.prismaClient.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    const book = await this.prismaClient.book.create({
      data,
    });
    return book;
  }

  async findAll() {
    return this.prismaClient.book.findMany();
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prismaClient.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    return await this.prismaClient.book.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const bookExists = await this.prismaClient.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    return await this.prismaClient.book.delete({
      where: {
        id,
      },
    });
  }
}