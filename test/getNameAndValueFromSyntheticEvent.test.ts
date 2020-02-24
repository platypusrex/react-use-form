import { getNameAndValueFromSyntheticEvent } from '../src/utils';
import { InputChangeEvent } from '../src/types';
import {
  checkboxRadioEventObject,
  eventObject,
  fileEventObject,
} from './testUtils';

describe('getNameAndValueFromSyntheticEvent', () => {
  it('should return name/value for an input', () => {
    const nameAndValue = getNameAndValueFromSyntheticEvent(
      eventObject as InputChangeEvent
    );
    expect(nameAndValue).toEqual({
      name: eventObject.target.name,
      value: eventObject.target.value,
    });
  });

  it('should return name and value for a file input', () => {
    const nameAndValue = getNameAndValueFromSyntheticEvent(
      fileEventObject as InputChangeEvent
    );
    expect(nameAndValue).toEqual({
      name: fileEventObject.target.name,
      value: fileEventObject.target.files,
    });
  });

  it('should return name and value for a checkbox/radio input', () => {
    const nameAndValue = getNameAndValueFromSyntheticEvent(
      checkboxRadioEventObject as InputChangeEvent
    );
    expect(nameAndValue).toEqual({
      name: checkboxRadioEventObject.target.name,
      value: checkboxRadioEventObject.target.checked,
    });
  });
});
