interface ItemPropType {
  title: string;
  value: string;
};


export const Item = ({ title, value } : ItemPropType) => {

  return (
    <div className="mb-5">
      <h4 className="text-md">{title}</h4>
      <h5 className="texr-sm">{value}</h5>
    </div>
  );
};