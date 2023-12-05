function isWinner(lostInARow, bet, budget) {
    return (lostInARow > 3) && (bet / budget) < 0.10;
}


export {
    isWinner
}