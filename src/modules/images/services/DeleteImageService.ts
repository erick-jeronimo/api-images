import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ImagesRepository } from '../typeorm/repositories/ImagesRepository';

class DeleteImageService {
  public async execute(id: string): Promise<void> {
    const imagesRepository = getCustomRepository(ImagesRepository);

    const image = await imagesRepository.findById(id);

    if (!image) {
      throw new AppError('Image not found', 404);
    }

    await imagesRepository.remove(image);
  }
}

export default DeleteImageService;
