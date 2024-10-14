import { DEFAULTDEPOSITTEMPLATE } from "@/config";

interface DefaultPriceOptionsProps {
  defaultPrice: number;
  handleSetDefaultPrice: (price: number) => void;
}

const DefaultPriceOptions = ({ defaultPrice, handleSetDefaultPrice }: DefaultPriceOptionsProps) => {
  return (
    <div className="mt-5 grid grid-cols-6 gap-3">
      {Object.entries(DEFAULTDEPOSITTEMPLATE).map(([key, value]) => (
        <div
          key={key}
          onClick={() => handleSetDefaultPrice(value)}
          className={`border text-center rounded py-3 uppercase cursor-pointer ${defaultPrice === value ? 'border-green-500' : 'border-bgDark-500'}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default DefaultPriceOptions;
