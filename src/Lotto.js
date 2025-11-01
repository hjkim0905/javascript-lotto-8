class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    const uniqueArr = new Set(numbers);
    if (numbers.length !== uniqueArr.size) {
      throw new Error('[ERROR] 로또 번호에 중복된 숫자가 있습니다.');
    }

    if (!numbers.every((number) => Number.isInteger(number))) {
      throw new Error('[ERROR] 로또 번호에 정수가 아닌 값이 있습니다.');
    }

    if (!numbers.every((number) => number < 46 && number > 0)) {
      throw new Error('[ERROR] 로또 번호에 1부터 45 사이가 아닌 값이 있습니다.');
    }
  }

  getMatchingCount(winningNumbers) {
    const matchingCount = winningNumbers.filter((winningNumber) => {
      this.#numbers.includes(winningNumber);
    });

    return matchingCount;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
