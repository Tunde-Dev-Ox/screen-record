import React from 'react';
import './index.scss';

const FeatureCard = ({ title, description, icon }) => {
    return(
        <div className="features-card">
            <div className="features-card__top">
                {icon}
                <h3>
                    {title}
                </h3>
            </div>
            <div className="features-card__content">
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default FeatureCard;