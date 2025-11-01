import { Console } from '@woowacourse/mission-utils';

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
    Console.print(`3개 일치 (5,000원) - ${lottoRankResults[5]}개`);
    Console.print(`4개 일치 (50,000원) - ${lottoRankResults[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${lottoRankResults[3]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${lottoRankResults[2]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${lottoRankResults[1]}개`);
    Console.print(`총 수익률은 ${percentageProfit}%입니다.`);
  }
}
