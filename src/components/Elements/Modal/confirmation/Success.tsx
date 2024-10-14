interface SuccessType {
  title: string;
  description: string;
  onSuccess: any;
}
export const Success = ({} : SuccessType) => {
  return <div>Success</div>;
};
