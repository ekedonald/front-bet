import { Routes, Route, } from "react-router-dom";
import { useScrollToPosition } from '@/hooks';
import { DashboardLayout } from "@/components/Layouts";
import PoolView from "@/views/pool-views";


export const PoolLayout = () => {
  useScrollToPosition();
	return (
		<>
			<div className="pool-container">
				<div className='pool-wrapper'>
					<DashboardLayout>
						<div className="lg:mx-5 mx-3 my-10">
							<Routes>
								<Route path="/*" element={<PoolView />} />
							</Routes>
						</div>
					</DashboardLayout>
				</div>
			</div>
		</>
	);
}