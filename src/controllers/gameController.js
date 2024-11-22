const Blackjack = require('../utils/blackjackLogic');

exports.startGame = (req, res) => {
    const game = new Blackjack();
    const playerHand = [game.dealCard(), game.dealCard()];
    const dealerHand = [game.dealCard(), game.dealCard()];

    req.session = { game, playerHand, dealerHand };

    res.json({
        playerHand,
        dealerHand: [{ value: dealerHand[0].value, suit: dealerHand[0].suit }, 'Hidden'],
    });
};

exports.hit = (req, res) => {
    const { game, playerHand } = req.session;
    playerHand.push(game.dealCard());
    const playerValue = game.calculateHandValue(playerHand);

    if (playerValue > 21) {
        return res.json({ message: 'Bust! You lost.', playerHand });
    }

    res.json({ playerHand, playerValue });
};

exports.stand = (req, res) => {
    const { game, playerHand, dealerHand } = req.session;

    let dealerValue = game.calculateHandValue(dealerHand);
    while (dealerValue < 17) {
        dealerHand.push(game.dealCard());
        dealerValue = game.calculateHandValue(dealerHand);
    }

    const playerValue = game.calculateHandValue(playerHand);
    if (dealerValue > 21 || playerValue > dealerValue) {
        return res.json({ message: 'You win!', playerHand, dealerHand });
    } else if (playerValue < dealerValue) {
        return res.json({ message: 'You lost!', playerHand, dealerHand });
    }

    res.json({ message: 'It\'s a draw!', playerHand, dealerHand });
};
