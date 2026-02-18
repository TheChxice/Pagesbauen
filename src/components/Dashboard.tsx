
import * as React from "react";
import {
  PlasmicDashboard,
  type DefaultDashboardProps
} from "./plasmic/applicant_tracking_system/PlasmicDashboard";
import type {HTMLElementRefOf} from "@plasmicapp/react-web";

export interface DashboardProps extends DefaultDashboardProps {}

function Dashboard_(props: DashboardProps, ref: HTMLElementRefOf<"div">) {
  return <PlasmicDashboard root={{ ref }} {...props} />;
}

const Dashboard = React.forwardRef(Dashboard_);
export default Dashboard;
