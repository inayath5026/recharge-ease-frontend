import axios from "axios";
import process from "process";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  
import Recharge from "./Recharge";
import "./Payment.css";

const Payment = () => {
  const [plansList, setPlansList] = useState([]);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.jio.com/api/jio-mdmdata-service/mdmdata/recharge/plans?productType=MOBILITY&billingType=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const data = jsonData.planCategories[1]?.subCategories[0]?.plans || [];
      setPlansList(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const selectedPlan = plansList.find((plan) => plan.id === id);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
    }

    const amount = parseInt(selectedPlan?.amount);

    const { data } = await axios.post("https://recharge-ease-backend.onrender.com/create-order", { amount });

    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY ,
        amount: data.amount,
        currency: "INR",
        name: "Recharge Ease",
        description: "Recharge Ease Transaction",
        order_id: data.id,
        handler: async function (response) {
            const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            };

            const verifyRes = await axios.post("https://recharge-ease-backend.onrender.com/verify-payment", verifyData);
            alert(verifyRes.data.message);
        },
        prefill: {
            name: "Recharge Ease",
            email: "recharge-ease-cust@example.com",
            contact: "9999999999",
        },
        theme: {
            color: "#004d40",
        },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};

  const handleInput = (e) => {
    setMobile(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Recharge plansList={plansList} />
      <input
        type="text"
        placeholder="Enter Mobile Number for Recharge"
        value={mobile}
        onChange={handleInput}
        className="mobile-input"
      />
      <br />
      <br />
      <button
        onClick={handlePayment}
        style={{ padding: "10px 20px", fontSize: "16px" }}
        className="payment-btn"
        disabled={mobile.length !== 10}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
