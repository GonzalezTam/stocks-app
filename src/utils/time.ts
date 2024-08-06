import { IntervalEnum } from '../enums';

export const intervalToMs = (interval: string): number => {
  switch (interval) {
    case IntervalEnum.MIN_1:
      return 60000;
    case IntervalEnum.MIN_5:
      return 300000;
    case IntervalEnum.MIN_15:
      return 900000;
    default:
      return 60000;
  }
};
