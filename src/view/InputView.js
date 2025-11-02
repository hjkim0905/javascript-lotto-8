import { Console } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';
import { LOTTO } from '../constants/lotto.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

export default class InputView {
  async getLottoPurchaseAmount() {
    try {
      const lottoPurchaseAmount = Number(
        (await Console.readLineAsync('구입금액을 입력해 주세요.\n')).trim(),
      );
      this.validatePurchaseAmount(lottoPurchaseAmount);

      return lottoPurchaseAmount;
    } catch (error) {
      Console.print(error.message);
      return this.getLottoPurchaseAmount();
    }
  }

  getLottoQuantity(lottoPurchaseAmount) {
    return lottoPurchaseAmount / LOTTO.PRICE;
  }

  async getWinningNumber() {
    try {
      const input = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
      const winningNumbers = input.split(',').map((number) => Number(number.trim()));

      const winningLotto = new Lotto(winningNumbers.sort((a, b) => a - b));

      return winningLotto;
    } catch (error) {
      Console.print(error.message);
      return this.getWinningNumber();
    }
  }

  async getBonusNumber(winningLotto) {
    try {
      const bonusNumber = Number(
        (await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n')).trim(),
      );
      this.validateBonusNumber(bonusNumber, winningLotto);

      return bonusNumber;
    } catch (error) {
      Console.print(error.message);
      return this.getBonusNumber(winningLotto);
    }
  }

  validatePurchaseAmount(lottoPurchaseAmount) {
    if (Number.isNaN(lottoPurchaseAmount)) {
      throw new Error(ERROR_MESSAGES.INVALID_NUMBER);
    }

    if (lottoPurchaseAmount < LOTTO.PRICE) {
      throw new Error(ERROR_MESSAGES.BELOW_MINIMUM_PURCHASE);
    }

    if (!Number.isInteger(lottoPurchaseAmount / LOTTO.PRICE)) {
      throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_UNIT);
    }
  }

  validateBonusNumber(bonusNumber, winningLotto) {
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.INVALID_NUMBER);
    }

    if (!Number.isInteger(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_NOT_INTEGER);
    }

    if (!(bonusNumber <= LOTTO.MAX_NUMBER && bonusNumber >= LOTTO.MIN_NUMBER)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_OUT_OF_RANGE);
    }

    if (winningLotto.hasBonusNumber(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE);
    }
  }
}
