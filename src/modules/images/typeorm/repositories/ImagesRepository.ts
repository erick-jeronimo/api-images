import { EntityRepository, Repository } from 'typeorm';
import Image from '@modules/images/typeorm/entities/Image';

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {
  public async findById(id: string): Promise<Image | undefined> {
    const image = this.findOne({
      where: {
        id,
      },
    });

    return image;
  }
}
