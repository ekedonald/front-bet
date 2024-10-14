import { Routes, Route, } from "react-router-dom";
import { Logo } from "@/components/Layouts";
import { lazy } from "react";

const VerifyEmail = lazy(() => import(`../../views/auth-views/VerifyEmail`));

export const VerifyEmailLayout = () => {
	return (
		<>
			<div className="auth-container py-12 bg-bgDark-900 min-h-[100vh]">
				<div className='auth-wrapper w-[430px] mx-auto'>
					<div className="flex justify-center items-center">
						<Logo size="md"/>	
					</div>
					<Routes>
            <Route
              path="/"
              element={<VerifyEmail title="Confirm email address" />}
            />
					</Routes>
				</div>
			</div>
		</>
	)
}