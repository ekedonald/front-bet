import { Routes, Route, } from "react-router-dom";
import { useScrollToPosition } from '@/hooks';
import { DashboardLayout } from "@/components/Layouts";
import TransactionView from "@/views/transaction-views";


export const TransactionLayout = () => {
  useScrollToPosition();
	return (
		<>
			<div className="transaction-container">
				<div className='transaction-wrapper'>
					<DashboardLayout>
						<div className="lg:mx-5 mx-3 py-10">
							<Routes>
								<Route path="/*" element={<TransactionView />} />
							</Routes>
						</div>
					</DashboardLayout>
				</div>
			</div>
		</>
	);
}