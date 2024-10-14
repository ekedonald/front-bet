import { Button } from "@/components/Elements";
import { Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import Yup from "@/libs/yup";
import { ForgotPasswordCodeCredentialsDTO, ForgotPasswordCredentialsDTO } from "@/views/auth-views/types";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordResetPasswordDTO, useForgotPassword } from "./api";
import { useState } from "react";
import { STAGEEMUM } from "@/config";
import { useForgotPasswordResetCode } from "./api";

interface ForgotPasswordPropsType {
  title: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required().email().trim().label('Email'),
});

const codeValidationSchema = Yup.object({
  code: Yup.number().required().label('Code'),
});

const ForgotPassword = ({ title }: ForgotPasswordPropsType) => {

  const forgotPasswordMutation = useForgotPassword();
  const forgotPasswordResetCodeMutation = useForgotPasswordResetCode();

  const isLoading = forgotPasswordMutation.isPending;
  const isLoadingResetCode = forgotPasswordResetCodeMutation.isPending;

  const [stage, setState] = useState(STAGEEMUM.FIRST);

  const nagivate = useNavigate();

  const handleSubmit = (values: ForgotPasswordCredentialsDTO) => {
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        setState(STAGEEMUM.SECOND)
      },
    });
  }

  const handleSubmitCode = (values: ForgotPasswordCodeCredentialsDTO) => {
    const resetPayload: ForgotPasswordResetPasswordDTO = {
      ...values,
      type: 1,
    }
    forgotPasswordResetCodeMutation.mutate(resetPayload, {
      onSuccess: () => {
        nagivate(`/reset-password?code=${values.code}`);
      }
    })
  }

  useDocumentTitle(title);
  return (
    <div className="card w-full bg-white mt-12 pt-6 ">
      <div className="card-body">
        {
          stage === STAGEEMUM.FIRST &&
          <>
            <h4 className="text-2xl text-primary text-center">Password Reset</h4>
            <Form<ForgotPasswordCredentialsDTO, typeof validationSchema>
              onSubmit={handleSubmit}
              schema={validationSchema}
              className="space-y-4"
            >
              {({ register, formState }) => (
                <div className="mt-5">
                  <div className="space-y-5">
                    <Input
                      placeholder="user@example.com"
                      label="Email address"
                      disabled={isLoading}
                      error={formState.errors['email']}
                      registration={register('email')}
                    />

                  </div>
                  <div className="space-y-8 mt-7">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      disabled={!formState.isValid || isLoading}
                      className="w-full"
                    >
                      Send Verification Code
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </>
        }
        {
          stage === STAGEEMUM.SECOND &&
          <>
            <h4 className="text-2xl text-primary text-center">Verification Code</h4>
            <Form<ForgotPasswordCodeCredentialsDTO, typeof codeValidationSchema>
              onSubmit={handleSubmitCode}
              schema={codeValidationSchema}
              className="space-y-4"
            >
              {({ register, formState }) => (
                <div className="mt-5">
                  <div className="space-y-5">
                    <Input
                      type="number"
                      placeholder="Code"
                      label="Verification code from email"
                      disabled={isLoadingResetCode}
                      error={formState.errors['code']}
                      registration={register('code')}
                    />

                  </div>
                  <div className="space-y-8 mt-7">
                    <Button
                      type="submit"
                      isLoading={isLoadingResetCode}
                      disabled={!formState.isValid || isLoadingResetCode}
                      className="w-full"
                    >
                      Verify Code
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </>
        }
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