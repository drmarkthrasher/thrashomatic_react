import Joi from '@hapi/joi';

const name = Joi.string().alphanum().max(254).required().label('Name');
const otherIngredients = Joi.string()
  .alphanum()
  .max(254)
  .label('otherIngredients');

const liquors = Joi.array().items(
  Joi.number().required().label('index'),
  Joi.string().required().label('Liquor Name'),
  Joi.boolean().required().label('isChecked'),
  Joi.number().required().label('amount')
);

export const addCocktail = Joi.object().keys({
  name,
  otherIngredients,
  liquors,
});
