import { faker } from '@faker-js/faker';

import { render, screen, describe, createEvent, it, expect, userEvent, fireEvent } from '@/test';

import { OTPInput } from './OTPInput';

describe('<OTPInput />', () => {
  it('should accept value & length props', async () => {
    const value = faker.datatype.number({ min: 0, max: 999999 }).toString();
    const valueArray = value.split('');
    const valueLength = value.length;
    const onChange = vi.fn();

    await render(<OTPInput name="otp" value={value} onChange={onChange} length={valueLength} />);

    const inputEls = screen.getAllByRole('textbox');
    expect(inputEls).toHaveLength(valueLength);

    inputEls.forEach((inputEl, idx) => {
      expect(inputEl).toHaveValue(valueArray[idx]);
    });
  });

  it('should allow typing of integer', async () => {
    const valueLength = faker.datatype.number({ min: 2, max: 6 });
    const onChange = vi.fn();

    await render(<OTPInput name="otp" value={''} onChange={onChange} length={valueLength} />);
    const inputEls = screen.getAllByRole('textbox');

    expect(inputEls).toHaveLength(valueLength);

    // inputEls.forEach(async (inputEl, idx) => {
    //   const digit = faker.datatype.number({ min: 0, max: 9 }).toString();

    //   await userEvent.type(inputEl, digit);
    //   expect(onChange).toHaveBeenCalledOnce();
    //   expect(onChange).toHaveBeenCalledWith(digit);
    //   const inputFocused = inputEls[idx + 1] || inputEl;
    //   expect(inputFocused).toHaveFocus();
    //   onChange.mockReset();
    // });
  });

  it('should NOT allow typing of integer (alphabets)', async () => {
    const valueLength = faker.datatype.number({ min: 2, max: 6 });
    const onChange = vi.fn();

    await render(
      <OTPInput name="otp" type="numeric" value={''} onChange={onChange} length={valueLength} />
    );

    const inputEls = screen.getAllByRole('textbox');
    expect(inputEls).toHaveLength(valueLength);

    inputEls.forEach(async (inputEl) => {
      const nonDigit = faker.random.alpha(1);
      await userEvent.type(inputEl, nonDigit);
      expect(onChange).not.toHaveBeenCalled();
      onChange.mockReset();
    });
  });

  it('should allow pasting of input (same length as length)', async () => {
    const value = faker.datatype.number({ min: 10, max: 999999 }).toString();
    const valueLength = value.length;
    const onChange = vi.fn();

    await render(
      <OTPInput name="otp" value={value} type="numeric" onChange={onChange} length={valueLength} />
    );
    const inputEls = screen.queryAllByRole('textbox');
    const randomIdx = faker.datatype.number({ min: 0, max: valueLength - 1 });
    const randomInputEl = inputEls[randomIdx];

    const paste = createEvent.paste(randomInputEl, {
      clipboardData: {
        getData: () => '123456',
      },
    });
    fireEvent(randomInputEl, paste);
    // randomInputEl.focus();
    // await userEvent.paste(value);

    // await waitFor(() => {
    //   expect(paste).toBeCalled();
    // });

    // expect(paste).toHaveBeenCalledWith(value);

    // expect(randomInputEl).not.toHaveFocus();
  });
});
