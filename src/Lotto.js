import { LOTTO } from './constants/lotto.js';
import { ERROR_MESSAGES } from './constants/messages.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_LOTTO_COUNT);
    }

    const uniqueArr = new Set(numbers);
    if (numbers.length !== uniqueArr.size) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_LOTTO_NUMBERS);
    }

    if (!numbers.every((number) => Number.isInteger(number))) {
      throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_NOT_INTEGER);
    }

    if (!numbers.every((number) => number <= LOTTO.MAX_NUMBER && number >= LOTTO.MIN_NUMBER)) {
      throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_OUT_OF_RANGE);
    }
  }

  getMatchingCount(winningLotto) {
    const winningNumbers = winningLotto.getNumbers();
    const matchingCount = winningNumbers.filter((winningNumber) =>
      this.#numbers.includes(winningNumber),
    );

    return matchingCount.length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
