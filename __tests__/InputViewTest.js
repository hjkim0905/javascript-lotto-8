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

describe('입력값(getWinningNumber) 테스트', () => {
  test('1부터 45 사이 외의 로또 번호 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5,50']);

    const inputView = new InputView();

    await expect(inputView.getWinningNumber()).rejects.toThrow('[ERROR]');
  });

  test('정수가 아닌 값 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['1.5,2,3,4,5,6']);

    const inputView = new InputView();

    await expect(inputView.getWinningNumber()).rejects.toThrow('[ERROR]');
  });

  test('6개 숫자가 아닌 갯수 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5']);

    const inputView = new InputView();

    await expect(inputView.getWinningNumber()).rejects.toThrow('[ERROR]');
  });

  test('중복된 번호 포함 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5,5']);

    const inputView = new InputView();

    await expect(inputView.getWinningNumber()).rejects.toThrow('[ERROR]');
  });
});

describe('입력값(getBonusNumber) 테스트', () => {
  test('빈 문자열 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5,6', '']);

    const inputView = new InputView();
    const winningLotto = await inputView.getWinningNumber();

    await expect(inputView.getBonusNumber(winningLotto)).rejects.toThrow('[ERROR]');
  });

  test('정수가 아닌 값 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5,6', '7.5']);

    const inputView = new InputView();
    const winningLotto = await inputView.getWinningNumber();

    await expect(inputView.getBonusNumber(winningLotto)).rejects.toThrow('[ERROR]');
  });

  test('1부터 45 사이 외의 보너스 번호 입력 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5,6', '50']);

    const inputView = new InputView();
    const winningLotto = await inputView.getWinningNumber();

    await expect(inputView.getBonusNumber(winningLotto)).rejects.toThrow('[ERROR]');
  });

  test('당첨 번호와 중복 시 예외가 발생한다.', async () => {
    mockQuestions(['1,2,3,4,5,6', '3']);

    const inputView = new InputView();
    const winningLotto = await inputView.getWinningNumber();

    await expect(inputView.getBonusNumber(winningLotto)).rejects.toThrow('[ERROR]');
  });
});
