import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Like, Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }


  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)
      delete user.password;

      return {
        ...user,
        // token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, roles: true } //! OJO!
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      // token: this.getJwtToken({ id: user.id })
    };
  }

  async checkAuthStatus(user: User) {

    return {
      ...user,
      // token: this.getJwtToken({ id: user.id })
    };

  }



  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

  private handleDBErrors(error: any): never {


    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  /* // Buscar usuarios que tengan el rol 'businessman'
  async getBusinessman() {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.roles @> :role', { role: ['businessman'] })
      .getMany();
  }

  // Buscar usuarios que tengan el rol 'user'
  async getUser() {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.roles @> :role', { role: ['user'] })
      .getMany();
  }

  // Desactivar un usuario
  async desactivateUser(id: string) {
    try {
      await this.userRepository.update(id, { status: false });
      return { message: 'Usuario desactivado' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // Activar un usuario
  async activateUser(id: string) {
    try {
      await this.userRepository.update(id, { status: true });
      return { message: 'Usuario activado' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  } */

}