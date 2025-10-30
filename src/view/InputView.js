import { Console } from '@woowacourse/mission-utils';

export default class InputView {
  async getLottoPurchaseAmount() {
    const lottoPurchaseAmount = Number(await Console.readLineAsync());
    this.validate(lottoPurchaseAmount);

    Console.print(lottoPurchaseAmount);

    return lottoPurchaseAmount;
  }

  async getWinningNumber() {}

  async getBonusNumber() {}

  validate(lottoPurchaseAmount) {
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
}
