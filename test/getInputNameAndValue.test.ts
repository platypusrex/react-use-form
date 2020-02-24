import { getInputNameAndValue } from '../src/utils';
import { OnChangeEvent } from '../src/types';
import { eventObject } from './testUtils';

describe('getInputNameAndValue', () => {
  it('should return name and value if supplied a change event object', () => {
    const nameAndValue = getInputNameAndValue(eventObject as OnChangeEvent);
    expect(nameAndValue).toEqual({
      name: eventObject.target.name,
      value: eventObject.target.value,
    });
  });

  it('should return custom name and value', () => {
    const nameAndValue = getInputNameAndValue({
      name: 'name',
      value: 'value',
    });
    expect(nameAndValue).toEqual({
      name: 'name',
      value: 'value',
    });
  });
});
