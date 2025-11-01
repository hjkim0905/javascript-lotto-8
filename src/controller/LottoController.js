import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoFactory from '../model/LottoFactory.js';
import LottoStatistics from '../model/LottoStatistics.js';

export default class LottoController {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    const lottoPurchaseAmount = await this.inputView.getLottoPurchaseAmount();
    const lottoQuantity = this.inputView.getLottoQuantity(lottoPurchaseAmount);
    this.outputView.printlottoQuantity(lottoQuantity);

    const lottos = LottoFactory.createLotto(lottoQuantity);
    this.outputView.printCreatedLottos(lottos);

    const winningLotto = await this.inputView.getWinningNumber();
    const bonusNumber = await this.inputView.getBonusNumber(winningLotto);

    const lottoRankResults = LottoStatistics.calculateRankResults(
      lottos,
      winningLotto,
      bonusNumber,
    );
    const percentageProfit = LottoStatistics.getPercentageProfit(
      lottoRankResults,
      lottoPurchaseAmount,
    );

    this.outputView.printResult(lottoRankResults, percentageProfit);
  }
}
