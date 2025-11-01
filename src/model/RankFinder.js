import { RANKS } from '../constants/ranks.js';

export default class RankFinder {
  static getRank(matchingCount, hasBonusNumber) {
    if (matchingCount === 5) {
      const secondRank = RANKS.find(
        (rank) => rank.matchingCount === matchingCount && rank.hasBonusNumber === hasBonusNumber,
      );

      return secondRank;
    }

    const rank = RANKS.find((rank) => rank.matchingCount === matchingCount);

    return rank;
  }
}
