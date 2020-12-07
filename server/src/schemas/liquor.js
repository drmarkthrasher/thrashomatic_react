import Joi from '@hapi/joi';

const index = Joi.number().required().label('index');
const title = Joi.string().required().label('title');
const isChecked = Joi.string().required().label('isChecked');
const amount = Joi.number().required().label('amount');
const isAvailable = Joi.boolean().required().label('isAvailable');
const type = Joi.string().required().label('type');

export const addLiquor = Joi.object().keys({
  index,
  title,
  isChecked,
  amount,
  isAvailable,
  type,
});
