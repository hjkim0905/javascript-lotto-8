import Lotto from '../Lotto.js';
import { Random } from '@woowacourse/mission-utils';
import { LOTTO } from '../constants/lotto.js';

export default class LottoFactory {
  static createLotto(lottoQuantity) {
    const lottoArray = Array.from(
      { length: lottoQuantity },
      () => {
        const numbers = Random.pickUniqueNumbersInRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_COUNT);
        return new Lotto(numbers.sort((a, b) => a - b));
      },
    );

    return lottoArray;
  }
}
