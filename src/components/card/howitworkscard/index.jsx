import React from 'react';
import './index.scss'


const HowItWorksCard = ({ title, description, icon }) => {
    return(
         <div className="how-it-works-card">
            <figure>
                {icon}
            </figure>
            <h3>
                {title}
            </h3>
            <p>
                {description}
            </p>
        </div>
    )
}

export default HowItWorksCard;