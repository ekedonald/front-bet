import { Routes, Route, } from "react-router-dom";
import { useScrollToPosition } from '@/hooks';
import { DashboardLayout } from "@/components/Layouts";
import DepositViews from "@/views/deposit-views";

export const DepositLayout = () => {
  useScrollToPosition();

	return (
		<>
			<div className="dashboard-container">
				<div className='dashboard-wrapper'>
					<DashboardLayout>
						<div className="lg:mx-5 mx-3 my-10">
							<Routes>
								<Route path="/*" element={<DepositViews />} />
							</Routes>
						</div>
					</DashboardLayout>
				</div>
			</div>
		</>
	)
}