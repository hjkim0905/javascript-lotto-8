import { Console } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';

export default class InputView {
  async getLottoPurchaseAmount() {
    const lottoPurchaseAmount = Number((await Console.readLineAsync()).trim());
    this.validatePurchaseAmount(lottoPurchaseAmount);

    return lottoPurchaseAmount;
  }

  async getWinningNumber() {
    const input = await Console.readLineAsync();
    const winningNumbers = input.split(',').map((number) => Number(number.trim()));

    const winningLotto = new Lotto(winningNumbers.sort());

    return winningLotto;
  }

  async getBonusNumber(winningLotto) {
    const bonusNumber = Number((await Console.readLineAsync()).trim());
    this.validateBonusNumber(bonusNumber, winningLotto);

    return bonusNumber;
  }

  validatePurchaseAmount(lottoPurchaseAmount) {
    if (!lottoPurchaseAmount) {
      throw new Error('[ERROR] 빈 문자열이 입력되었습니다.');
    }

    if (Number.isNaN(lottoPurchaseAmount)) {
      throw new Error('[ERROR] 숫자가 아닌 값이 입력되었습니다.');
    }

    if (lottoPurchaseAmount < 1000) {
      throw new Error('[ERROR] 1000 미만 값이 입력되었습니다.');
    }

    if (!Number.isInteger(lottoPurchaseAmount / 1000)) {
      throw new Error('[ERROR] 입력값이 1000으로 나눴을 때 정수형 숫자로 나눠떨어지지 않습니다.');
    }
  }

  validateBonusNumber(bonusNumber, winningLotto) {
    if (!bonusNumber) {
      throw new Error('[ERROR] 빈 문자열이 입력되었습니다.');
    }

    if (!Number.isInteger(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호에 정수가 아닌 값이 있습니다.');
    }

    if (!(bonusNumber < 46 && bonusNumber > 0)) {
      throw new Error('[ERROR] 보너스 번호에 1부터 45 사이가 아닌 값이 있습니다.');
    }

    if (winningLotto.hasBonusNumber(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호가 당첨 번호와 중복됩니다.');
    }
  }
}
