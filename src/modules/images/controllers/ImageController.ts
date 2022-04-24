import { Request, Response } from 'express';
import CreateImageService from '../services/CreateImageService';
import DeleteImageService from '../services/DeleteImageService';
import ShowImageService from '../services/ShowImageService';
import UpdateImageService from '../services/UpdateImageService';
import UploadImageService from '../services/UploadImageService';

export default class ImageController {
  public async index(request: Request, response: Response) {
    const uploadImages = new UploadImageService();

    const data = await uploadImages.execute();

    return response.status(201).json(data);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showImage = new ShowImageService();

    const image = await showImage.execute({ id });

    return response.json(image);
  }

  public async create(request: Request, response: Response) {
    const { uri } = request.body;
    const hits = 1;

    const createImage = new CreateImageService();

    const image = await createImage.execute({
      uri,
      hits,
    });

    return response.status(201).json(image);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { uri, hits } = request.body;

    const updateImage = new UpdateImageService();

    const image = await updateImage.execute({
      id,
      uri,
      hits,
    });

    return response.json(image);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteImage = new DeleteImageService();
    await deleteImage.execute(id);

    return response.json({ message: 'Image removed' });
  }
}
