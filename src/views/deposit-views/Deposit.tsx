import { BalanceCard, Button, PaymentStatusBadge } from "@/components/Elements";
import { Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import Yup from "@/libs/yup";
import { DepositDTO, StatusDTO, useDeposit, useStatus } from "./api";
import QRCode from "react-qr-code";
import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { useState, useEffect } from "react";
import { DEFAULTDEPOSITCURRENCYTEMPLATE, DEFAULTDEPOSITTEMPLATE, TRANSACTION_PREFIX_PATH } from "@/config";
import { Transaction } from "../transaction-views/types";
import DefaultPriceOptions from "./DefaultPriceOptions";
import { toast } from "sonner";
import { format } from '@/libs/date';
import { useNavigate } from "react-router-dom";
import DepositCurrencyOptions from "./DepositCurrencyOptions";

interface DepositPropType {
  title: string;
}

interface DepositFormType {
  amount: number;
}

const breadcrumbItems = [
  { label: 'Transaction', link: '#' },
  { label: 'Deposit', link: '#' },
];

const validationSchema = Yup.object({
  amount: Yup.number().required().label('Amount'),
});

const Deposit = ({ title }: DepositPropType) => {
  useDocumentTitle(title);

  const depositMutation = useDeposit();
  const statusMutation = useStatus();

  const [stage, setStage] = useState(false);
  const [deposit, setDeposit] = useState<Transaction | null>(null);
  const [currency, setCurrency] = useState(DEFAULTDEPOSITCURRENCYTEMPLATE.BTC);

  const [defaultPrice, setDefaultPrice] = useState(DEFAULTDEPOSITTEMPLATE?.ONEHUNDRED);

  const isLoading = depositMutation.isPending;
  const isStatusLoading = statusMutation.isPending;

  const handleSubmit = (values: DepositFormType) => {
    const payload: DepositDTO = {
     amount : values?.amount,
     currency: currency, 
    }
    console.log(payload);
    depositMutation.mutate(payload, {
      onSuccess: (data: Transaction) => {
        setDeposit(data);
        setStage(true);
      },
    });
  }

  const navigate = useNavigate();

  const handleGetStatus = () => {
    const payload : StatusDTO = {
      payment_id: deposit?.id ?? "",
    };
    statusMutation.mutate(payload, {
      onSuccess: (data: Transaction) => {
        setDeposit(data);
        toast.info(`Deposit is ${data?.status}`);
        navigate(`${TRANSACTION_PREFIX_PATH}/${data?.id}`);
      },
    });
  }

  const handleSetDefaultPrice = (price: number) => {
    setDefaultPrice(price);
  };

  const handleSetCurrency = (currency: string) => {
    setCurrency(currency);
  };

  return (
    <div className="deposit-wrapper">
      <div className="">
        <h4 className="text-2xl mb-5">Fund your account</h4>
        <Breadcrumbs items={breadcrumbItems} />
        <BalanceCard />
        <div className="container mt-5 grid lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-bgDark-800 border dark:border-bgDark-800 border-gray-200 shadow-md px-5 py-5 rounded-xl">
            <h4 className="text-medium">Which crytpocurrency do you want to deposit in?</h4>
            <DepositCurrencyOptions defaultCurrency={currency} handleSetDefaultCurrency={handleSetCurrency} />
            <br />
            <h4 className="text-medium">How much do you want to fund your account with?</h4>
            <DefaultPriceOptions defaultPrice={defaultPrice} handleSetDefaultPrice={handleSetDefaultPrice} />
            <Form<DepositDTO, typeof validationSchema>
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
                        Fund Account
                      </Button>
                    </div>
                  </div>
                );
              }}
            </Form>
          </div>
          {
            stage && deposit &&
            <div className="bg-white dark:bg-bgDark-800 border shadow-md px-5 py-5 rounded-xl dark:border-bgDark-800 border-gray-200">
              <div className="flex items-center justify-center pt-10">
                <QRCode
                  value={deposit?.payment_object?.pay_address}
                  className="p-5 bg-white rounded-lg"
                  size={200}
                />
              </div>
              <div className="grid grid-cols-2">
                <h4 className="mt-10">Pay Amount: {deposit?.payment_object?.pay_amount}</h4>
                <h4 className="mt-10">Currency: {deposit?.payment_object?.pay_currency}</h4>
                <h4 className="mt-10">Status: <PaymentStatusBadge status={deposit?.status}/></h4>
                <h4 className="mt-10">Network: {deposit?.payment_object?.network}</h4>
                <h4 className="mt-10">Amount Received: {deposit?.payment_object?.actually_paid ?? 0}</h4>
                <h4 className="mt-10">Valid Until: {format(new Date(deposit?.payment_object?.valid_until), 'dd/MMM/yyyy HH:mm:ss')}</h4>
              </div>
              <div className="px-5 py-3 rounded-lg border border-gray-300 dark:border-bgDark-500 mt-5">
                <h6 className="text-sm font-normal mb-2">Send {deposit?.payment_object?.pay_amount} { deposit?.payment_object?.pay_currency } to this address:</h6>
                <h4 className="font-lighter">{deposit?.payment_object?.pay_address}</h4>
              </div>
              <p className="mt-5">For security, this address changes after each deposits Only deposit USDT in the wallet provided</p>
              <Button 
                className="mt-5 w-full"
                size="lg"
                onClick={handleGetStatus}
                isLoading={isStatusLoading}
              >
                I have made payment, confirm now
              </Button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Deposit;
