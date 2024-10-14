import { Routes, Route, } from "react-router-dom";
import { useScrollToPosition } from '@/hooks';
import { DashboardLayout } from "@/components/Layouts";
import WithdrawViews from "@/views/withdraw-views";

export const WithdrawLayout = () => {
  useScrollToPosition();

	return (
		<>
			<div className="dashboard-container">
				<div className='dashboard-wrapper'>
					<DashboardLayout>
						<div className="mx-6 my-10">
							<Routes>
								<Route path="/*" element={<WithdrawViews />} />
							</Routes>
						</div>
					</DashboardLayout>
				</div>
			</div>
		</>
	)
}