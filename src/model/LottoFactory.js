import Lotto from '../Lotto.js';
import { Random } from '@woowacourse/mission-utils';

export default class LottoFactory {
  static createLotto(lottoQuantity) {
    const lottoArray = Array.from(
      { length: lottoQuantity },
      () => new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6)),
    );

    return lottoArray.sort();
  }
}
