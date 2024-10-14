import { Button } from "@/components/Elements";
import { OTPInput } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { ConfirmEmailDTO, useConfirmEmail, useResendVerificationEmail } from "./api";
import { useAuth } from "@/libs/auth";
import { useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { DASHBOARD_PREFIX_PATH, OTPTYPE } from "@/config";
import { toast } from "sonner";

interface ForgotPasswordPropsType {
  title: string;
}

const ConfirmEmail = ({ title }: ForgotPasswordPropsType) => {

  const {
    user,
    actions: { logout },
  } = useAuth();

  const [otpValue, setOtpValue] = useState('');

  const [value, resetValue, isComplete] = useCountdown(60);

  const confirmEmail = useConfirmEmail();

  const nagivate = useNavigate();

  const resendCode = useResendVerificationEmail({
    config: {
      enabled: false,
    },
  });

  const handleSubmit = async () => {
    const payload: ConfirmEmailDTO = {
      code: otpValue,
      type: OTPTYPE.EMAIL,
    }
    confirmEmail.mutate(payload, {
      onSuccess() {
        toast.success('Email verified successfully')
        nagivate(`${DASHBOARD_PREFIX_PATH}`)
      },
    });
  };

  const handleResend = async () => {
    await resendCode.refetch();
    resetValue();
  };
  

  useDocumentTitle(title);
  return (
    <div className="card w-full bg-white mt-12 pt-6 ">
      <div className="card-body">
        <h4 className="text-2xl text-primary text-center">Confirm your email</h4>
        <p className="text-gray-800 mt-4">
          An OTP has been sent to <span className="font-semibold">{user?.email}.</span> Please input
          the code sent to confirm your email
        </p>
        <div>
        <>
          <div className="space-y-5 mt-3">
            <OTPInput
              value={otpValue}
              type="numeric"
              onChange={(e) => setOtpValue(e.target.value)}
              length={6}
              disabled={confirmEmail.isPending}
            />
            <p>
              Not recieve OTP code?{' '}
              <Button
                disabled={confirmEmail.isPending || resendCode.isInitialLoading || !isComplete}
                variant="text"
                isLoading={resendCode.isFetching}
                onClick={handleResend}
                className="px-0 font-medium text-blue-400"
              >
                Resend code
              </Button>
              {!isComplete && (
                <span className="animate-pulse  pl-4 text-sm font-semibold text-blue-400">
                  {value.minutes.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                  m :
                  {value.seconds.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                  s
                </span>
              )}
            </p>
          </div>
          <div className="mt-6 space-y-8">
            <Button
              disabled={otpValue.trim().length < 6 || resendCode.isInitialLoading}
              onClick={handleSubmit}
              isLoading={confirmEmail.isPending}
              className="w-full "
            >
              Verify
            </Button>
            <div className="text-center">
              <Button
                variant="text"
                // startIcon={<BackIcon className="w-3.5" />}
                onClick={() => logout('/register')}
                className="inline-block text-center text-base font-medium text-gray-700"
              >
                <span className="font-medium">Back to </span>
                <span className="font-semibold text-blue-400 outline-none hover:text-blue-500">
                  Sign up
                </span>
              </Button>
            </div>
          </div>
        </>
      </div>
      </div>
    </div>
  )
}

export default ConfirmEmail;