import RankFinder from './RankFinder.js';

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
}
