import { Injectable } from '@nestjs/common';
import { AvatarDTO } from '../dto/user.dto';
import { IStorage } from '../../../infrastructure/providers/storage/storage';
import { IUserRepository } from '../repositories/user.repository';
import { extname } from 'path';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: AvatarDTO) {
    const extFile = extname(data.file.originalname);
    const transformName = `${data.userId}${extFile}`;

    /**
     * originalname = avatar.png
     * originalname = transformName (123456789.png)
     */

    data.file.originalname = transformName;

    await this.storage.upload(data.file, 'avatar');

    const pathAvatarUser = `avatar/${data.file.originalname}`;

    await this.userRepository.uploadAvatar(data.userId, pathAvatarUser);
  }
}
