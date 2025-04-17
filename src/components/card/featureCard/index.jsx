import React from 'react';
import './index.scss';

const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className='features-card'>
            <div className="features-card-icon">
                {icon}
            </div>
            <h3>
                {title}
            </h3>
            <p>
                {description}
            </p>
        </div>
    )
}

export default FeatureCard