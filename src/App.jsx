import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Payment from "./Payment";
import PlansList from "./PlansList";

function App(){
  return <PlansList/>;
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/recharge/:id",
    element: <Payment />,
  }
]);

export default appRouter;
