import { useForm } from '@platypusrex/react-use-form';
import { InferType, object, string } from 'yup';
import { SelectField } from './components/SelectField/SelectField';
import { TextField } from './components/TextField/TextField';
import { Button } from './components/Button/Button';
import { stateOptions } from './stateOptions';
import './index.css';

const pobox = /\bP(ost|ostal)?([ \.]*(O|0)(ffice)?)?([ \.]*Box)\b/i;
const alpha = /^[^!@#$%^&*()<>:;"'{}[\]|+=?/\\_]*$/;

const schema = object({
  address1: string()
    .required()
    .test('no-po-box', 'P.O. box is not allowed', (value) => !pobox.test(value!))
    .test('no-alphanumeric', 'No alphanumeric characters allowed', value => alpha.test(value!)),
  address2: string().optional(),
  city: string().required(),
  state: string().required(),
  zip: string().required().min(5).max(5),
});

type FormValues = InferType<typeof schema>;

const initialValues: FormValues = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
};

export const AddressForm: React.FC = () => {
  const {
    values,
    errors,
    isValid,
    setValue,
    reset,
    onChange,
    onSubmit
  } = useForm<FormValues>({
    initialValues,
    validation: {
      schema,
      debounce: { in: 1000, out: 0 },
    },
  });

  const handleSubmit = (formValues: FormValues) => {
    console.log('values', formValues);
  };

  return (
    <>
      <div className="header">
        <h3>Address Form</h3>
        <div className="button-wrapper">
          <button onClick={reset}>reset form</button>
        </div>
      </div>
      <form className="form" onSubmit={onSubmit(handleSubmit)}>
        <TextField
          id="address-one"
          label="Address Line One"
          name="address1"
          type="text"
          value={values.address1}
          error={errors?.address1}
          onChange={onChange}
        />
        <TextField
          id="address-two"
          label="Address Line Two"
          name="address2"
          type="text"
          value={values.address2}
          error={errors?.address2}
          onChange={onChange}
        />
        <TextField
          id="city"
          label="City"
          name="city"
          type="text"
          value={values.city}
          error={errors?.city}
          onChange={onChange}
        />
        <SelectField
          id="state-input"
          name="state"
          label="State"
          value={values.state}
          options={stateOptions}
          error={errors?.state}
          onChange={onChange}
        />
        <TextField
          id="zip-input"
          label="Zip"
          name="zip"
          type="text"
          value={values.zip}
          error={errors?.zip}
          onChange={onChange}
        />
        <Button disabled={!isValid}>Submit</Button>
      </form>
      <div className="button-wrapper margin-top space-around">
        <button onClick={() => setValue('city', 'Charleston')}>set city</button>
      </div>
    </>
  );
};
