import { Routes, Route, } from "react-router-dom";
import AuthViews from '@/views/auth-views';
import { Logo } from "@/components/Layouts";

export const AuthLayout = () => {
	return (
		<>
			<div className="auth-container py-12 bg-bgDark-900 min-h-[100vh]">
				<div className='auth-wrapper w-[430px] mx-auto'>
					<div className="flex justify-center items-center">
						<Logo size="md"/>	
					</div>
					<Routes>
						<Route path="/*" element={<AuthViews />} />
					</Routes>
				</div>
			</div>
		</>
	)
}


export default AuthLayout
