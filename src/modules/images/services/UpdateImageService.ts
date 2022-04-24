import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Image from '../typeorm/entities/Image';
import { ImagesRepository } from '../typeorm/repositories/ImagesRepository';

interface IRequest {
  id: string;
  uri: string;
  hits: string;
}

class UpdateImageService {
  public async execute({ id, uri, hits }: IRequest): Promise<Image> {
    const imagesRepository = getCustomRepository(ImagesRepository);

    const image = await imagesRepository.findById(id);

    if (!image) {
      throw new AppError('Image not found', 404);
    }

    image.uri = uri;
    image.hits = hits;

    console.log(image);
    await imagesRepository.save(image);

    return image;
  }
}

export default UpdateImageService;
