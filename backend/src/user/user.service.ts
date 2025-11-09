import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<{ message: string; user: any }> {
    const { email, password } = registerUserDto;

    try {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new this.userModel({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      await newUser.save();

      const userObject = newUser.toObject();
      const { password: _, ...userWithoutPassword } = userObject;

      return {
        message: 'User registered successfully',
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
