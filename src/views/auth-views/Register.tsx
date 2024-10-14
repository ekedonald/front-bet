import { Button } from "@/components/Elements";
import { Form, Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import Yup from "@/libs/yup";
import { RegisterCredentialsDTO } from "@/views/auth-views/types";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "./api";

interface RegisterPropsType {
  title: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required().email().trim().label('Email'),
  password: Yup.string().required().label('Password'),
  first_name: Yup.string().required().label('First Name'),
  last_name: Yup.string().required().label('Last Name'),
});

const Register = ({ title }: RegisterPropsType) => {

  const signupMutation = useSignUp();

  const isLoading = signupMutation.isPending;

  const navigate = useNavigate();

  const handleSubmit = (values: RegisterCredentialsDTO) => {
    signupMutation.mutate(values, {
      onSuccess: () => {
        navigate('/confirm-email');
      },
    });
  }

  useDocumentTitle(title);
  return (
    <div className="card w-full bg-white mt-12 pt-6 ">
      <div className="card-body">
        <h4 className="text-2xl text-primary text-center">Create a new account</h4>
        <Form<RegisterCredentialsDTO, typeof validationSchema>
          onSubmit={handleSubmit}
          schema={validationSchema}
          className="space-y-4"
        >
          {({ register, formState }) => (
            <div className="mt-5">
              <div className="space-y-5">

                <Input
                  placeholder="First Name"
                  label="First Name"
                  name="first_name"
                  disabled={isLoading}
                  error={formState.errors['first_name']}
                  registration={register('first_name')}
                />

                <Input
                  placeholder="Last Name"
                  label="Last Name"
                  name="last_name"
                  disabled={isLoading}
                  error={formState.errors['last_name']}
                  registration={register('last_name')}
                />

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


              </div>
              <div className="space-y-8 mt-7">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={!formState.isValid || isLoading}
                  className="w-full"
                >
                  Create account
                </Button>
              </div>
            </div>
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

export default Register;