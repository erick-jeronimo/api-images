import { getCustomRepository } from 'typeorm';
import Image from '../typeorm/entities/Image';
import { ImagesRepository } from '../typeorm/repositories/ImagesRepository';

interface IRequest {
  uri: string;
  hits: number;
}

class CreateImageService {
  public async execute({ uri, hits }: IRequest): Promise<Image> {
    const imagesRepository = getCustomRepository(ImagesRepository);

    const image = imagesRepository.create({
      uri,
      hits,
    });

    await imagesRepository.save(image);

    return image;
  }
}

export default CreateImageService;
