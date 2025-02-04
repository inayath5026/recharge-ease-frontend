import React from 'react';
import './Plan.css';

const Plan = ({ planData,isButton }) => {
    return (
        <div className="plan-card">
            <div className="plan-header">
                <h2 className="plan-title">₹ {planData.amount}</h2>
                <h4 className="plan-subtitle">Validity: {planData.primeData.offerBenefits3} {planData.primeData.offerBenefits4}</h4>
            </div>
            <div className="plan-details">
                <p className="plan-data">
                    <strong>Data:</strong> {planData.primeData.offerBenefits1} {planData.primeData.offerBenefits2}
                </p>
                <div className="plan-extras">
                    <p><strong>{planData.misc.details[3].header}:</strong> {planData.misc.details[3].value}</p>
                    <p><strong>{planData.misc.details[4].header}:</strong> {planData.misc.details[4].value}</p>
                </div>
            </div>
            {
                isButton ? <button className="plan-action-btn">Recharge Now</button> : null
            }
        </div>
    );
}

export default Plan;
