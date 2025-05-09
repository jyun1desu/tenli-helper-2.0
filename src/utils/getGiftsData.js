const getGiftData = (giftList, points) => {
    const sortedGifts = giftList.sort((a, b) => a.threshold - b.threshold);

    let currentGift = undefined;
    let nextGift = undefined;

    for (let i = 0; i < sortedGifts.length; i++) {
        const gift = sortedGifts[i];

        if (points >= gift.threshold) {
            currentGift = gift;
        } else {
            nextGift = gift;
            break;
        }
    }

    const pointsToNext = nextGift ? nextGift.threshold - points : 0;

    return {
        gift: currentGift || undefined,
        nextGift: nextGift || undefined,
        nextGiftProgress: nextGift ? (points / nextGift.threshold) * 100 : 100,
        pointsToNext,
    };
}

export default getGiftData;