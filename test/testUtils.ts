import * as yup from 'yup';

export const validationSchema = yup
  .object()
  .shape({
    firstName: yup.string(),
    lastName: yup.string().required(),
  })
  .defined();

export const formValues: yup.InferType<typeof validationSchema> = {
  firstName: 'foo',
  lastName: 'bar',
};

export const debounceTiming = {
  in: 500,
  out: 500,
};

export const eventObject: {
  target: { type: string; name: string; value: string };
} = {
  target: {
    type: 'text',
    name: 'input_name',
    value: 'input_value',
  },
};

const file = {
  name: 'test.jpg',
  type: 'image/jpg',
} as File;

const fileList: FileList = {
  length: 1,
  item: () => null,
  0: file,
};

export const fileEventObject: {
  target: { type: string; name: string; files: FileList };
} = {
  target: {
    type: 'file',
    name: 'file_input',
    files: fileList,
  },
};

export const checkboxRadioEventObject: {
  target: { type: string; name: string; checked: boolean };
} = {
  target: {
    type: 'checkbox',
    name: 'input_name',
    checked: false,
  },
};
