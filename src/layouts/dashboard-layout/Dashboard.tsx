import DashboardViews from "@/views/dashboard-views";
import { Routes, Route, } from "react-router-dom";
import { useScrollToPosition } from '@/hooks';
import { DashboardLayout } from "@/components/Layouts";

export const TopDashboardLayout = () => {
  useScrollToPosition();

	return (
		<>
			<div className="dashboard-container">
				<div className='dashboard-wrapper'>
					<DashboardLayout>
						<div className="lg:mx-5 mx-3 my-10">
							<Routes>
								<Route path="/*" element={<DashboardViews />} />
							</Routes>
						</div>
					</DashboardLayout>
				</div>
			</div>
		</>
	)
}