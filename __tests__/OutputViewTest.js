import OutputView from '../src/view/OutputView.js';
import Lotto from '../src/Lotto.js';
import { Console } from '@woowacourse/mission-utils';

const mockPrint = () => {
  Console.print = jest.fn();
};

describe('OutputView 테스트(printlottoQuantity)', () => {
  beforeEach(() => {
    mockPrint();
  });

  test('로또 1개 구입시 1개를 출력한다.', () => {
    const outputView = new OutputView();
    outputView.printlottoQuantity(1);

    expect(Console.print).toHaveBeenCalledWith('\n1개를 구매했습니다.');
  });
});

describe('OutputView 테스트(printCreatedLottos)', () => {
  beforeEach(() => {
    mockPrint();
  });

  test('생성된 로또 번호들을 출력한다.', () => {
    const outputView = new OutputView();
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([7, 8, 9, 10, 11, 12])];

    outputView.printCreatedLottos(lottos);

    expect(Console.print).toHaveBeenCalledTimes(2);
    expect(Console.print).toHaveBeenNthCalledWith(1, '[1, 2, 3, 4, 5, 6]');
    expect(Console.print).toHaveBeenNthCalledWith(2, '[7, 8, 9, 10, 11, 12]');
  });
});

describe('OutputView 테스트(printResult)', () => {
  beforeEach(() => {
    mockPrint();
  });

  test('1등 당첨이 있는 경우 맞게 출력한다.', () => {
    const outputView = new OutputView();
    const lottoRankResults = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 };
    const percentageProfit = 200000000.0;

    outputView.printResult(lottoRankResults, percentageProfit);

    expect(Console.print).toHaveBeenNthCalledWith(6, '6개 일치 (2,000,000,000원) - 1개');
    expect(Console.print).toHaveBeenNthCalledWith(7, '총 수익률은 200000000%입니다.');
  });
});
