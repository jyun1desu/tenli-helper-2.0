const getGiftData = (giftList, points) => {
    const sortedGifts = giftList.sort((a, b) => a.pvCost - b.pvCost);

    let currentGift = undefined;
    let nextGift = undefined;

    for (let i = 0; i < sortedGifts.length; i++) {
        const gift = sortedGifts[i];

        if (points >= gift.pvCost) {
            currentGift = gift;
        } else {
            nextGift = gift;
            break;
        }
    }

    const pointsToNext = nextGift ? nextGift.pvCost - points : 0;

    return {
        gift: currentGift || undefined,
        nextGift: nextGift || undefined,
        nextGiftProgress: nextGift ? (points / nextGift.pvCost) * 100 : 100,
        pointsToNext,
    };
}

export default getGiftData;