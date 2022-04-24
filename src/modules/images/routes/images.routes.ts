import { Router } from 'express';
import ImageController from '../controllers/ImageController';
import { celebrate, Joi, Segments } from 'celebrate';

const imagesRouter = Router();

const imageController = new ImageController();

imagesRouter.get('/', imageController.index);

imagesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  imageController.show,
);

imagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      uri: Joi.string().required(),
    },
  }),
  imageController.create,
);

imagesRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      uri: Joi.string(),
      hits: Joi.number(),
    },
  }),
  imageController.update,
);
imagesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  imageController.delete,
);

export default imagesRouter;
