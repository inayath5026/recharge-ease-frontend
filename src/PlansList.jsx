import { useEffect, useState } from "react";
import Plan from "./Plan";
import "./PlansList.css";
import { Link } from "react-router";
import Shimmer from "./Shimmer";
import Header from "./Header";

const PlansList = () => {
  const [plansList, setPlansList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://thingproxy.freeboard.io/fetch/https://www.jio.com/api/jio-mdmdata-service/mdmdata/recharge/plans?productType=MOBILITY&billingType=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const data = jsonData.planCategories[1].subCategories[0].plans;
      setPlansList(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (plansList.length == 0) {
    return (
      <>
      
        <Header/>
        <Shimmer/>
      
      </>
    );
  }

  return (
    <>
      <div>
        <Header />
        <div className="plans">
          {plansList.map((plan) => (
            <Link key={plan.id} to={"/recharge/" + plan.id}>
              <Plan planData={plan} className={plan} isButton={true} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlansList;
