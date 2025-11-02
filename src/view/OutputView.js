import { Console } from '@woowacourse/mission-utils';
import { RANKS } from '../constants/ranks.js';

export default class OutputView {
  printlottoQuantity(lottoQuantity) {
    Console.print(`\n${lottoQuantity}개를 구매했습니다.`);
  }

  printCreatedLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  printResult(lottoRankResults, percentageProfit) {
    Console.print('\n당첨 통계\n---');

    const rank5 = RANKS.find(rank => rank.rank === 5);
    Console.print(`3개 일치 (${rank5.winningAmount.toLocaleString()}원) - ${lottoRankResults[5]}개`);

    const rank4 = RANKS.find(rank => rank.rank === 4);
    Console.print(`4개 일치 (${rank4.winningAmount.toLocaleString()}원) - ${lottoRankResults[4]}개`);

    const rank3 = RANKS.find(rank => rank.rank === 3);
    Console.print(`5개 일치 (${rank3.winningAmount.toLocaleString()}원) - ${lottoRankResults[3]}개`);

    const rank2 = RANKS.find(rank => rank.rank === 2);
    Console.print(`5개 일치, 보너스 볼 일치 (${rank2.winningAmount.toLocaleString()}원) - ${lottoRankResults[2]}개`);

    const rank1 = RANKS.find(rank => rank.rank === 1);
    Console.print(`6개 일치 (${rank1.winningAmount.toLocaleString()}원) - ${lottoRankResults[1]}개`);

    Console.print(`총 수익률은 ${percentageProfit}%입니다.`);
  }
}
