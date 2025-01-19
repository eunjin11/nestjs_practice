import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.userRepository.create({ username, password });

    try {
      await this.userRepository.save(user);
    } catch (error: any) {
      if (error.code === '23505')
        throw new ConflictException('Existing username');
      else throw new InternalServerErrorException();
    }
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.createUser(authCredentialDto);
    return;
  }
}
