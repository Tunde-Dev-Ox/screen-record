import React from "react";
import "./index.scss";

const UsecaseCard = ({ title, description, img }) => {
    return (
        <div className="usecase-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="usecase-card-img">{img}</div>
            <div className="usecase--overlay"></div>
        </div>
    );
}

export default UsecaseCard;