import Plan from "./Plan";
import "./PlansList.css";
import { useParams } from "react-router-dom";

const Recharge = ({ plansList }) => {
  const { id } = useParams();

  return (
    <>
      <div className="plans">
        {plansList
          .filter((plan) => plan.id === id) 
          .map((filteredPlan) => (
            <Plan key={filteredPlan.id} planData={filteredPlan} isButton={false} />
          ))}
      </div>
    </>
  );
};

export default Recharge;