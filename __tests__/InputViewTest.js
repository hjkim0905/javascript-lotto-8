import InputView from '../src/view/InputView.js';
import Lotto from '../src/Lotto.js';
import { Console } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe('입력값(getLottoPurchaseAmount) 테스트', () => {
  test('빈 문자열 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['', '1000']);

    const inputView = new InputView();
    const result = await inputView.getLottoPurchaseAmount();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(1000);
    logSpy.mockRestore();
  });

  test('숫자가 아닌 값 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['abc', '2000']);

    const inputView = new InputView();
    const result = await inputView.getLottoPurchaseAmount();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(2000);
    logSpy.mockRestore();
  });

  test('1000 미만 값 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['500', '3000']);

    const inputView = new InputView();
    const result = await inputView.getLottoPurchaseAmount();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(3000);
    logSpy.mockRestore();
  });

  test('1000으로 나눴을 때 정수형 숫자로 나눠떨어지지 않는 경우 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['1500', '4000']);

    const inputView = new InputView();
    const result = await inputView.getLottoPurchaseAmount();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(4000);
    logSpy.mockRestore();
  });
});

describe('입력값(getWinningNumber) 테스트', () => {
  test('1부터 45 사이 외의 로또 번호 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['1,2,3,4,5,50', '1,2,3,4,5,6']);

    const inputView = new InputView();
    const result = await inputView.getWinningNumber();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    logSpy.mockRestore();
  });

  test('정수가 아닌 값 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['1.5,2,3,4,5,6', '7,8,9,10,11,12']);

    const inputView = new InputView();
    const result = await inputView.getWinningNumber();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result.getNumbers()).toEqual([7, 8, 9, 10, 11, 12]);
    logSpy.mockRestore();
  });

  test('6개 숫자가 아닌 갯수 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['1,2,3,4,5', '13,14,15,16,17,18']);

    const inputView = new InputView();
    const result = await inputView.getWinningNumber();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result.getNumbers()).toEqual([13, 14, 15, 16, 17, 18]);
    logSpy.mockRestore();
  });

  test('중복된 번호 포함 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['1,2,3,4,5,5', '19,20,21,22,23,24']);

    const inputView = new InputView();
    const result = await inputView.getWinningNumber();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result.getNumbers()).toEqual([19, 20, 21, 22, 23, 24]);
    logSpy.mockRestore();
  });
});

describe('입력값(getBonusNumber) 테스트', () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test('빈 문자열 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['', '7']);

    const inputView = new InputView();
    const result = await inputView.getBonusNumber(winningLotto);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(7);
    logSpy.mockRestore();
  });

  test('정수가 아닌 값 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['7.5', '8']);

    const inputView = new InputView();
    const result = await inputView.getBonusNumber(winningLotto);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(8);
    logSpy.mockRestore();
  });

  test('1부터 45 사이 외의 보너스 번호 입력 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['50', '9']);

    const inputView = new InputView();
    const result = await inputView.getBonusNumber(winningLotto);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(9);
    logSpy.mockRestore();
  });

  test('당첨 번호와 중복 시 에러 메시지를 출력하고 재입력을 요청한다.', async () => {
    const logSpy = jest.spyOn(Console, 'print');
    mockQuestions(['3', '10']);

    const inputView = new InputView();
    const result = await inputView.getBonusNumber(winningLotto);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(result).toBe(10);
    logSpy.mockRestore();
  });
});
