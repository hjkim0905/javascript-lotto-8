import RankFinder from './RankFinder.js';
import { RANKS } from '../constants/ranks.js';
import { CALCULATION } from '../constants/calculation.js';

export default class LottoStatistics {
  static calculateRankResults(lottos, winningLotto, bonusNumber) {
    const lottoRankResults = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    lottos.forEach((lotto) => {
      this.updateRankResult(lotto, winningLotto, bonusNumber, lottoRankResults);
    });

    return lottoRankResults;
  }

  static updateRankResult(lotto, winningLotto, bonusNumber, lottoRankResults) {
    const matchingCount = lotto.getMatchingCount(winningLotto);
    const hasBonusNumber = lotto.hasBonusNumber(bonusNumber);
    const rank = RankFinder.getRank(matchingCount, hasBonusNumber);

    if (!rank) {
      return;
    }

    this.addRankCount(lottoRankResults, rank.rank);
  }

  static addRankCount(lottoRankResults, rank) {
    lottoRankResults[rank] += 1;
  }

  static getPercentageProfit(lottoRankResults, lottoPurchaseAmount) {
    const totalWinningAmount = RANKS.reduce((total, currentRank) => {
      const count = lottoRankResults[currentRank.rank];
      return total + currentRank.winningAmount * count;
    }, 0);

    const percentageProfit = (totalWinningAmount / lottoPurchaseAmount) * CALCULATION.PERCENTAGE_MULTIPLIER;
    return Math.round(percentageProfit * CALCULATION.DECIMAL_PRECISION) / CALCULATION.DECIMAL_PRECISION;
  }
}
