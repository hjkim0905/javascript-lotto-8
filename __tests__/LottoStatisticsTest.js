import LottoStatistics from '../src/model/LottoStatistics.js';
import Lotto from '../src/Lotto.js';

describe('LottoStatistics 테스트(calculateRankResults)', () => {
  test('당첨된 로또가 없으면 모든 등수가 0개이다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([7, 8, 9, 10, 11, 12])];
    const winningLotto = new Lotto([13, 14, 15, 16, 17, 18]);
    const bonusNumber = 19;

    const result = LottoStatistics.calculateRankResults(lottos, winningLotto, bonusNumber);

    expect(result).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  });

  test('1등이 1개 있으면 1등 개수가 1이다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([7, 8, 9, 10, 11, 12])];
    const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const result = LottoStatistics.calculateRankResults(lottos, winningLotto, bonusNumber);

    expect(result).toEqual({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 });
  });

  test('2등이 1개 있으면 2등 개수가 1이다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 7]), new Lotto([8, 9, 10, 11, 12, 13])];
    const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const result = LottoStatistics.calculateRankResults(lottos, winningLotto, bonusNumber);

    expect(result).toEqual({ 1: 0, 2: 1, 3: 0, 4: 0, 5: 0 });
  });

  test('3등이 1개 있으면 3등 개수가 1이다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 8]), new Lotto([9, 10, 11, 12, 13, 14])];
    const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const result = LottoStatistics.calculateRankResults(lottos, winningLotto, bonusNumber);

    expect(result).toEqual({ 1: 0, 2: 0, 3: 1, 4: 0, 5: 0 });
  });

  test('4등이 1개 있으면 4등 개수가 1이다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 8, 9]), new Lotto([10, 11, 12, 13, 14, 15])];
    const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const result = LottoStatistics.calculateRankResults(lottos, winningLotto, bonusNumber);

    expect(result).toEqual({ 1: 0, 2: 0, 3: 0, 4: 1, 5: 0 });
  });

  test('5등이 1개 있고 4등이 1개 있으면 5등, 4등 개수가 각각 1이다.', () => {
    const lottos = [new Lotto([1, 2, 3, 8, 9, 10]), new Lotto([1, 2, 3, 4, 15, 16])];
    const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const result = LottoStatistics.calculateRankResults(lottos, winningLotto, bonusNumber);

    expect(result).toEqual({ 1: 0, 2: 0, 3: 0, 4: 1, 5: 1 });
  });
});

describe('LottoStatistics 테스트(getPercentageProfit)', () => {
  test('1등이 1개 있고 구입금액이 1000원이면 수익률은 200000000.0%이다.', () => {
    const lottoRankResults = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 };
    const lottoPurchaseAmount = 1000;

    const percentageProfit = LottoStatistics.getPercentageProfit(
      lottoRankResults,
      lottoPurchaseAmount,
    );

    expect(percentageProfit).toEqual(200000000.0);
  });

  test('2등이 1개 있고 5등이 2개 있고 구입금액이 1000000원이면 수익률은 3001.0%이다.', () => {
    const lottoRankResults = { 1: 0, 2: 1, 3: 0, 4: 0, 5: 2 };
    const lottoPurchaseAmount = 1000000;

    const percentageProfit = LottoStatistics.getPercentageProfit(
      lottoRankResults,
      lottoPurchaseAmount,
    );

    expect(percentageProfit).toEqual(3001.0);
  });
});
