import { Button } from "@/components/Elements";
import { Checkbox, Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import Yup from "@/libs/yup";
import { LoginCredentialsDTO } from "@/views/auth-views/types";
import { Link, useNavigate } from "react-router-dom";
import { useLoginWithEmailAndPassword } from "./api";
import { DASHBOARD_PREFIX_PATH } from "@/config";

interface LoginPropsType {
  title: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required().email().trim().label('Email'),
  password: Yup.string().required().label('Password'),
  rememberMe: Yup.boolean().default(false).label('Remember Me'),
});

const Login = ({ title }: LoginPropsType) => {

  const loginMutation = useLoginWithEmailAndPassword();

  const isLoading = loginMutation.isPending;

  const navigate = useNavigate();

  const handleSubmit = (values: LoginCredentialsDTO) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate(DASHBOARD_PREFIX_PATH)
      },
    });
  }

  useDocumentTitle(title);
  return (
    <div className="card w-full bg-white mt-12 pt-6 ">
      <div className="card-body">
        <h4 className="text-2xl text-primary text-center">Log in to your account</h4>
        <Form<LoginCredentialsDTO, typeof validationSchema>
          onSubmit={handleSubmit}
          schema={validationSchema}
          initialValues={{
            rememberMe: true,
          }}
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
                <Input
                  placeholder="••••••••"
                  type="password"
                  label="Password"
                  name="password"
                  disabled={isLoading}
                  error={formState.errors['password']}
                  registration={register('password')}
                />

                <div className="flex items-center justify-between pb-6">
                  <Checkbox
                    disabled={isLoading}
                    registration={register('rememberMe')}
                    error={formState.errors['rememberMe']}
                    label="Remember for 30 days"
                    labelClassName="inline-flex text-black pt-3 gap-2 flex-row-reverse"
                  />

                  <Link to="/forgot-password" className="text-sm font-medium text-primary">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="space-y-8">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={!formState.isValid || isLoading}
                  className="w-full"
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </Form>
        <p className="pt-6 text-center text-base font-medium text-gray-700">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-primary hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;