import { getCustomRepository } from 'typeorm';
import { ImagesRepository } from '../typeorm/repositories/ImagesRepository';
import axios from 'axios';
import cloudionaryUploader from '@config/cloudionaryUploader';
import streamfier from 'streamifier';
import AppError from '@shared/errors/AppError';

interface IRequest {
  hits: number;
  uri: string;
}

class UploadImageService {
  public async execute() {
    try {
      const imagesRepository = getCustomRepository(ImagesRepository);
      const images: IRequest[] = [];

      const response = await axios.get(
        'https://picsum.photos/200/300?random=1',
        {
          responseType: 'arraybuffer',
        },
      );

      const buffer = Buffer.from(response.data, 'utf-8');

      const upload_stream = cloudionaryUploader.uploader.upload_stream(
        {
          folder: 'images',
        },
        function (error, result) {
          if (error) {
            throw new AppError('Error', 500);
          }

          const image = imagesRepository.create({
            hits: 1,
            uri: result?.url,
          });

          imagesRepository.save(image);
          images.push(image);
        },
      );

      streamfier.createReadStream(buffer).pipe(upload_stream);

      return JSON.stringify(images);
    } catch {
      throw new AppError('An error ocurred on uploading images.', 500);
    }
  }
}

export default UploadImageService;
