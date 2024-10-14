import { Button } from "@/components/Elements";
import { Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import Yup from "@/libs/yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordDTO, useResetPassword } from "./api";
import { useEffect } from "react";
import { toast } from "sonner";

interface ForgotPasswordPropsType {
  title: string;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .required()
    .min(8)
    .max(50)
    .label('Password'),
  confirm_password: Yup.string()
    .required()
    .label('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

type ResetPasswordValues = Yup.InferType<typeof validationSchema>;

const ForgotPassword = ({ title }: ForgotPasswordPropsType) => {

  const resetPasswordMutation = useResetPassword();

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const nagivate = useNavigate();

  const isLoading = resetPasswordMutation.isPending;

  const code = parseInt(queryParams?.code);



  const handleSubmit = (values: ResetPasswordValues) => {
    const resetPasswordPayload : ResetPasswordDTO = {
      password: values.password,
      code:  code,
      type: 1,
    }
    resetPasswordMutation.mutate(resetPasswordPayload, {
      onSuccess: () => {
        nagivate('/');
      },
    });
  }

  useEffect(() => {
    if(!code){
      toast.error('Verification code is not found');
      nagivate('/');
    }
  }, [code]);

  useDocumentTitle(title);
  return (
    <div className="card w-full bg-white mt-12 pt-6 ">
      <div className="card-body">
        <h4 className="text-2xl text-primary text-center">Set new password</h4>
        <Form<ResetPasswordValues, typeof validationSchema>
          onSubmit={handleSubmit}
          schema={validationSchema}
          initialValues={{}}
          className="space-y-4"
        >
          {({ register, formState, trigger }) => (
            <>
              <div className="space-y-5">
                <Input
                  placeholder="••••••••"
                  type="password"
                  label="Enter your password"
                  disabled={isLoading}
                  error={formState.errors['password']}
                  registration={register('password')}
                  onKeyUp={async () => {
                    await trigger('confirm_password');
                  }}
                  autoComplete="new-password"
                />
                <Input
                  placeholder="••••••••"
                  type="password"
                  label="Confirm your password"
                  disabled={isLoading}
                  error={formState.errors['confirm_password']}
                  registration={register('confirm_password')}
                  autoComplete="off"
                />
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Reset password
              </Button>
            </>
          )}
        </Form>
        <p className="pt-6 text-center text-base font-medium text-gray-700">
          Already have an account?{' '}
          <Link to="/" className="font-semibold text-primary hover:text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword;