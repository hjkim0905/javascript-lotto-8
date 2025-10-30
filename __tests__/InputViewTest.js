import InputView from '../src/view/InputView.js';
import { Console } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe('입력값(getLottoPurchaseAmount) 테스트', () => {
  test('빈 문자열 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['']);

    const inputView = new InputView();

    await expect(inputView.getLottoPurchaseAmount()).rejects.toThrow('[ERROR]');
  });

  test('숫자가 아닌 값 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['abc']);

    const inputView = new InputView();

    await expect(inputView.getLottoPurchaseAmount()).rejects.toThrow('[ERROR]');
  });

  test('1000 미만 값 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['500']);

    const inputView = new InputView();

    await expect(inputView.getLottoPurchaseAmount()).rejects.toThrow('[ERROR]');
  });

  test('1000으로 나눴을 때 정수형 숫자로 나눠떨어지지 않는 경우 예외가 발생한다.', async () => {
    mockQuestions(['1500']);

    const inputView = new InputView();

    await expect(inputView.getLottoPurchaseAmount()).rejects.toThrow('[ERROR]');
  });
});

// describe('입력값(getWinningNumber) 테스트', () => {
//   test('로또를 구매한 개수만큼만 생성한다.', () => {
//     const lottos = LottoFactory.createLotto(5);

//     expect(lottos).toHaveLength(5);
//   });
// });

// describe('입력값(getBonusNumber) 테스트', () => {
//   test('로또를 구매한 개수만큼만 생성한다.', () => {
//     const lottos = LottoFactory.createLotto(5);

//     expect(lottos).toHaveLength(5);
//   });
// });
