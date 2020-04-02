import { getSFromHMS } from '../helper';

describe('Helpers', () => {
  it('getSFromHMS', () => {
    console.log(getSFromHMS('13 : 28 : 44'));
    console.log(getSFromHMS('00 : 09 : 20'));
  });
});
