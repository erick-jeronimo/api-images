import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Image from '../typeorm/entities/Image';
import { ImagesRepository } from '../typeorm/repositories/ImagesRepository';

interface IRequest {
  id: string;
}

class ShowImageService {
  public async execute({ id }: IRequest): Promise<Image | undefined> {
    const imagesRepository = getCustomRepository(ImagesRepository);

    const Image = await imagesRepository.findOne(id);

    if (!Image) {
      throw new AppError('Image not found', 404);
    }

    return Image;
  }
}

export default ShowImageService;
