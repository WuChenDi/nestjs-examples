import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersDocument, Users } from './schemas/users.schema'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async create(createUserDto: CreateUserDto) {
    // 入库
    const createUser = await this.usersModel.create(createUserDto)
    return createUser
  }

  async findAll() {
    return await this.usersModel.find().exec()
    // return `This action returns all users1111`;
  }

  async findOne(id: string) {
    return await this.usersModel.findById(id).exec()
    // return `This action returns a #${id} user`;
  }

  async remove(id: string) {
    return await this.usersModel.findByIdAndDelete(id)
    // return `This action removes a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true })
  }
}
