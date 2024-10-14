import { Button } from '@/components/Elements';
import { Form, Input } from '@/components/Form';
import Yup from '@/libs/yup';
import { Summary } from './Summary';
import { BETCHOICEOPTION, DEFAULTDEPOSITTEMPLATE, STAKE_PREFIX_PATH } from '@/config';
import { PoolType, SaveBetDTO, TokenType } from '@/views/pool-views/types';
import { useEffect, useState } from 'react';
import { useCreateBet } from '@/views/pool-views/api';
import { toast } from 'sonner';
import DefaultPriceOptions from '@/views/deposit-views/DefaultPriceOptions';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  amount: Yup.number().required().label('Amount'),
});

interface InputSectionPoopPropsType {
  pool: PoolType;
}

type InputFormDTO = {
  amount: number;
}

export const InputSection = ({pool}: InputSectionPoopPropsType) => {
  const [betChoice, setBetChoice] = useState<string>(BETCHOICEOPTION?.BASE_UP);
  const [betChoiceOutcome, setBetChoiceOutcome] = useState<string>(`${pool?.ticker?.base_token?.name} goes up`);
  const [defaultPrice, setDefaultPrice] = useState<number>(DEFAULTDEPOSITTEMPLATE?.FITHY);

  const createBetMutation = useCreateBet();
  const isLoading = createBetMutation.isPending;
  const navigate = useNavigate();


  const handleSubmit = (values: InputFormDTO) => {
    const createBetPayload: SaveBetDTO = {
      bet_price: values?.amount,
      choice: betChoice,
      pool_id: pool?.id,
      choice_outcome: betChoiceOutcome
    }

    createBetMutation.mutate(createBetPayload, {
      onSuccess: (bet) => {
        toast.success('Bet created');
        navigate(`${STAKE_PREFIX_PATH}/${bet?.data?.bet?.id}`);
      },
    });
  }

  const handleSetDefaultPrice = (price: number) => {
    setDefaultPrice(price);
  };

  const handleChoiceSelect = (choice: string, token: TokenType, action: string) => {
    setBetChoice(choice);
    setBetChoiceOutcome(`${token?.name} goes ${action}`);
  }
  return (
    <div className="input-section flex flex-col justify-center">
      <h4 className='font-bold text-md'>Place Bet</h4>
      <Form<InputFormDTO, typeof validationSchema>
        onSubmit={handleSubmit}
        schema={validationSchema}
        initialValues={{
          amount: 10,
        }}
        className="space-y-4"
      >
        {({ register, formState, setValue }) => {
          useEffect(() => {
            setValue('amount', defaultPrice);
          }, [defaultPrice, setValue]);

          return (
          <>
            <h3 className='mt-5 font-thin'>Select your choice</h3>
            <div className="grid grid-cols-2 gap-3">
              <div onClick={() => handleChoiceSelect(BETCHOICEOPTION?.BASE_UP, pool?.ticker?.base_token, 'up')} className={`border text-center rounded py-3 uppercase cursor-pointer ${betChoice === BETCHOICEOPTION?.BASE_UP ? 'border-green-500' : 'border-bgDark-500'}`}>{pool?.ticker?.base_token?.name} Goes Up</div>
              <div onClick={() => handleChoiceSelect(BETCHOICEOPTION?.BASE_DOWN, pool?.ticker?.base_token, 'down')} className={`border text-center rounded py-3 uppercase cursor-pointer ${betChoice === BETCHOICEOPTION?.BASE_DOWN ? 'border-green-500' : 'border-bgDark-500'}`}>{pool?.ticker?.base_token?.name} Goes down</div>
              <div onClick={() => handleChoiceSelect(BETCHOICEOPTION?.TARGET_UP, pool?.ticker?.target_token, 'up')} className={`border text-center rounded py-3 uppercase cursor-pointer ${betChoice === BETCHOICEOPTION?.TARGET_UP ? 'border-green-500' : 'border-bgDark-500'}`}>{pool?.ticker?.target_token?.name} Goes Up</div>
              <div onClick={() => handleChoiceSelect(BETCHOICEOPTION?.TARGET_DOWN, pool?.ticker?.base_token, 'down')} className={`border text-center rounded py-3 uppercase cursor-pointer ${betChoice === BETCHOICEOPTION?.TARGET_DOWN ? 'border-green-500' : 'border-bgDark-500'}`}>{pool?.ticker?.target_token?.name} Goes down</div>
            </div>
            <h3 className='mt-5 font-thin'>How much do you want to place?</h3>
            <DefaultPriceOptions defaultPrice={defaultPrice} handleSetDefaultPrice={handleSetDefaultPrice} />
            <div className="mt-3">
              <Input
                placeholder="Amount"
                disabled={false}
                type='number'
                error={formState.errors['amount']}
                registration={register('amount')}
              />
            </div>
            <Summary />
            <div className="mt-5">
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!formState.isValid || isLoading}
                className="w-full"
              >
                Place Bet
              </Button>
            </div>
          </>
          )
        }}
      </Form>
    </div>
  )
};