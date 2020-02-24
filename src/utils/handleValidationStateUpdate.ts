import { Dispatch, SetStateAction } from 'react';

export function handleValidationStateUpdate<TState>(
  name: string,
  value: any,
  updateState: Dispatch<SetStateAction<TState>>
): void {
  updateState(prevState => ({
    ...prevState,
    [name]: value,
  }));
}
