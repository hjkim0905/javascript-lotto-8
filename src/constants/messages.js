const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = {
  INVALID_NUMBER: `${ERROR_PREFIX} 숫자가 아닌 값이 입력되었습니다.`,
  BELOW_MINIMUM_PURCHASE: `${ERROR_PREFIX} 1000 미만 값이 입력되었습니다.`,
  INVALID_PURCHASE_UNIT: `${ERROR_PREFIX} 입력값이 1000으로 나눴을 때 정수형 숫자로 나눠떨어지지 않습니다.`,
  INVALID_LOTTO_COUNT: `${ERROR_PREFIX} 로또 번호는 6개여야 합니다.`,
  DUPLICATE_LOTTO_NUMBERS: `${ERROR_PREFIX} 로또 번호에 중복된 숫자가 있습니다.`,
  LOTTO_NUMBER_NOT_INTEGER: `${ERROR_PREFIX} 로또 번호에 정수가 아닌 값이 있습니다.`,
  LOTTO_NUMBER_OUT_OF_RANGE: `${ERROR_PREFIX} 로또 번호에 1부터 45 사이가 아닌 값이 있습니다.`,
  BONUS_NUMBER_NOT_INTEGER: `${ERROR_PREFIX} 보너스 번호에 정수가 아닌 값이 있습니다.`,
  BONUS_NUMBER_OUT_OF_RANGE: `${ERROR_PREFIX} 보너스 번호에 1부터 45 사이가 아닌 값이 있습니다.`,
  BONUS_NUMBER_DUPLICATE: `${ERROR_PREFIX} 보너스 번호가 당첨 번호와 중복됩니다.`,
};
