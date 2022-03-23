const routerCard = require('express').Router();

const {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/', getAllCards);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCard);
routerCard.put('/:cardId/likes', likeCard);
routerCard.delete('/:cardId/likes', dislikeCard);

module.exports = {
  routerCard,
};
