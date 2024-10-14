import { Button } from "@/components/Elements";
import { Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import Yup from "@/libs/yup";
import { ChangePasswordDTO } from "./types";
import { useChangePassword } from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SETTING_PREFIX_PATH } from "@/config";

interface PasswordPropType {
  title: string;
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string().required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Password = ({ title } : PasswordPropType) => {
  useDocumentTitle(title);

  const changePasswordMutation = useChangePassword();

  const isLoading = changePasswordMutation.isPending;

  const navigate = useNavigate();
  const handleSubmit = (values: ChangePasswordDTO) => {
    changePasswordMutation.mutate(values, {
      onSuccess: () => {
        navigate(`${SETTING_PREFIX_PATH}/profile`);
        toast.success('Password has been changed');
      },
    });
  }
  
  return (
    <div className="password-wrapper">
      <h4 className="font-semibold text-xl">Security Information</h4>
      <h4 className="font-lighter text-sm mt-3">Update your password.</h4>
      <Form<ChangePasswordDTO, typeof validationSchema>
          onSubmit={handleSubmit}
          schema={validationSchema}
          className="space-y-4"
        >
          {({ register, formState }) => (
            <div className="grid lg:grid-cols-4">
              <div className="Password-photo-text col-span-2">
                <div className="mt-5">
                  <Input 
                    placeholder="••••••••"
                    disabled={isLoading}
                    label="Old Password"
                    type="password"
                    error={formState.errors['oldPassword']}
                    registration={register('oldPassword')}
                  />
                </div>
                <div className="mt-5">
                  <Input 
                    placeholder="••••••••"
                    disabled={isLoading}
                    label="New Password"
                    type="password"
                    error={formState.errors['newPassword']}
                    registration={register('newPassword')}
                  />
                </div>
                <div className="mt-5">
                  <Input 
                    placeholder="••••••••"
                    disabled={isLoading}
                    label="Confirm Password"
                    type="password"
                    error={formState.errors['confirmPassword']}
                    registration={register('confirmPassword')}
                  />
                </div>
                <div className="mt-5">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!formState.isValid || isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
      </Form>
    </div>
  );
};

export default Password;