import { DEFAULTDEPOSITCURRENCYTEMPLATE } from "@/config";

interface DepositCurrencyOptionsProps {
  defaultCurrency: string;
  handleSetDefaultCurrency: (currency: string) => void;
}

const DepositCurrencyOptions = ({ defaultCurrency, handleSetDefaultCurrency }: DepositCurrencyOptionsProps) => {
  return (
    <div className="mt-5 grid grid-cols-6 gap-3">
      {Object.entries(DEFAULTDEPOSITCURRENCYTEMPLATE).map(([key, value]) => (
        <div
          key={key}
          onClick={() => handleSetDefaultCurrency(value)}
          className={`border text-center rounded py-3 uppercase cursor-pointer ${defaultCurrency === value ? 'border-green-500' : 'border-bgDark-500'}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default DepositCurrencyOptions;
