class Blackjack {
    constructor() {
        this.deck = this.generateDeck();
        this.shuffleDeck();
    }

    generateDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = [
            '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
        ];
        let deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ value, suit });
            }
        }
        return deck;
    }

    shuffleDeck() {
        this.deck = this.deck.sort(() => Math.random() - 0.5);
    }

    dealCard() {
        return this.deck.pop();
    }

    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        for (let card of hand) {
            if (['J', 'Q', 'K'].includes(card.value)) {
                value += 10;
            } else if (card.value === 'A') {
                aces += 1;
                value += 11;
            } else {
                value += parseInt(card.value);
            }
        }
        while (value > 21 && aces) {
            value -= 10;
            aces -= 1;
        }
        return value;
    }
}

module.exports = Blackjack;
