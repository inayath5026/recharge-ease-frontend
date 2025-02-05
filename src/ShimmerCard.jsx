import React from "react";
import "./ShimmerCard.css";

const ShimmerCard = () => {
    return (
        <div className="shimmer-card">
            <div className="shimmer-header shimmer"></div>
            <div className="shimmer-subtitle shimmer"></div>
            <div className="shimmer-details">
                <div className="shimmer-line shimmer"></div>
                <div className="shimmer-line shimmer small"></div>
            </div>
            <div className="shimmer-extras">
                <div className="shimmer-line shimmer"></div>
                <div className="shimmer-line shimmer"></div>
            </div>
            <div className="shimmer-button shimmer"></div>
        </div>
    );
};

export default ShimmerCard;