import { Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import { WithdrawDTO } from "./types";
import { BalanceCard, Button } from "@/components/Elements";
import Yup from "@/libs/yup";
import { useWithdraw } from "./api";
import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import { DEFAULTDEPOSITTEMPLATE, TRANSACTION_PREFIX_PATH } from "@/config";
import { toast } from "sonner";
import DefaultPriceOptions from "../deposit-views/DefaultPriceOptions";
import { useNavigate } from "react-router-dom";

interface WithdrawPropType {
  title: string;
};

const breadcrumbItems = [
  { label: 'Transaction', link: '#' },
  { label: 'Withdraw', link: '#' },
];

const validationSchema = Yup.object({
  amount: Yup.number().required().label('Amount'),
});

const Withdraw = ({ title } : WithdrawPropType) => {
  useDocumentTitle(title);

  const navigate = useNavigate();

  const withdrawMutation = useWithdraw();

  const [defaultPrice, setDefaultPrice] = useState<number>(DEFAULTDEPOSITTEMPLATE?.FITHY);

  const isLoading = withdrawMutation.isPending;

  const handleSubmit = (values: WithdrawDTO) => {
    withdrawMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success('Withdrawal is being processed');
        navigate(`${TRANSACTION_PREFIX_PATH}/${data?.id}`);
      },
    });
  }

  const handleSetDefaultPrice = (price: number) => {
    setDefaultPrice(price);
  };

  return (
    <div className="deposit-wrapper">
      <div className="">
        <h4 className="text-2xl mb-5">Withdraw from account</h4>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="my-5">
          <BalanceCard />
        </div>
        <div className="container mt-5 grid lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-bgDark-800  border dark:border-bgDark-800 border-gray-400 shadow-md px-5 py-5 rounded-xl">
            <h4 className="text-medium">How much do you want to withdraw from your account?</h4>
            <DefaultPriceOptions defaultPrice={defaultPrice} handleSetDefaultPrice={handleSetDefaultPrice} />
            <Form<WithdrawDTO, typeof validationSchema>
              onSubmit={handleSubmit}
              schema={validationSchema}
              className="space-y-4"
            >
              {({ register, formState, setValue }) => {
                useEffect(() => {
                  setValue('amount', defaultPrice);
                }, [defaultPrice, setValue]);

                return (
                  <div className="mt-5">
                    <div className="space-y-5">
                      <Input
                        type="number"
                        disabled={isLoading}
                        value={defaultPrice}
                        error={formState.errors['amount']}
                        registration={register('amount')}
                      />

                    </div>
                    <div className="space-y-8 mt-7">
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={!formState.isValid || isLoading}
                        className="w-full"
                      >
                        Withdraw
                      </Button>
                    </div>
                  </div>
                )
              }}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;