import RankFinder from '../src/model/RankFinder.js';

describe('RankFinder 테스트', () => {
  test('번호가 6개 일치하면 1등을 한다.', () => {
    const rank = RankFinder.getRank(6, false);
    expect(rank.rank).toBe(1);
  });

  test('번호가 5개 일치하고 보너스 번호도 일치하면 2등을 한다.', () => {
    const rank = RankFinder.getRank(5, true);
    expect(rank.rank).toBe(2);
  });

  test('번호가 5개 일치하고 보너스 번호는 일치하지 않으면 3등을 한다.', () => {
    const rank = RankFinder.getRank(5, false);
    expect(rank.rank).toBe(3);
  });

  test('번호가 4개 일치하고 보너스 번호도 일치해도 무시하고 4등을 한다.', () => {
    const rank = RankFinder.getRank(4, true);
    expect(rank.rank).toBe(4);
  });

  test('번호가 4개 일치하고 보너스 번호는 일치하지 않으면 4등을 한다.', () => {
    const rank = RankFinder.getRank(4, false);
    expect(rank.rank).toBe(4);
  });

  test('번호가 3개 일치하고 보너스 번호도 일치해도 무시하고 5등을 한다.', () => {
    const rank = RankFinder.getRank(3, true);
    expect(rank.rank).toBe(5);
  });

  test('번호가 3개 일치하고 보너스 번호는 일치하지 않으면 5등을 한다.', () => {
    const rank = RankFinder.getRank(3, false);
    expect(rank.rank).toBe(5);
  });
});
