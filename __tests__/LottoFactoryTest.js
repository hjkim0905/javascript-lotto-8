import LottoFactory from '../src/model/LottoFactory.js';
import Lotto from '../src/Lotto.js';

describe('로또 팩토리 테스트', () => {
  test('로또를 구매한 개수만큼만 생성한다.', () => {
    const lottos = LottoFactory.createLotto(5);

    expect(lottos).toHaveLength(5);
  });

  test('생성된 로또는 모두 Lotto클래스의 인스턴스이다.', () => {
    const lottos = LottoFactory.createLotto(5);

    lottos.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });

  test('정상적으로 에러없이 로또가 생성된다.', () => {
    expect(() => {
      LottoFactory.createLotto(5);
    }).not.toThrow();
  });
});
