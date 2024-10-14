
import { TokenType } from "./types";

interface DefaultPriceOptionsProps {
  token: TokenType;
  handleSetDefaultToken: (symbol: string) => void;
  defaultSymbol: string;
}

const PoolTokenIndicator = ({ token, handleSetDefaultToken, defaultSymbol }: DefaultPriceOptionsProps) => {
  return (
    <div className="grid gap-3">
      <div
        onClick={() => handleSetDefaultToken(token?.symbol)}
        className={`border w-full text-center rounded py-3 px-2 uppercase cursor-pointer ${defaultSymbol === token?.symbol ? 'border-green-500' : 'border-bgDark-500'}`}
      >
        {token?.name}
      </div>
    </div>
  );
};

export default PoolTokenIndicator;
