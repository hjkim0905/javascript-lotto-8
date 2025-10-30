import Lotto from '../Lotto.js';
import { Random } from '@woowacourse/mission-utils';

export default class LottoFactory {
  static createLotto(lottoQuantity) {
    return Array.from(
      { length: lottoQuantity },
      () => new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6)),
    );
  }
}
