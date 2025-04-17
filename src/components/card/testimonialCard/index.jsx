import './index.scss';
import { CiStar } from 'react-icons/ci';

const TestimonialCard = ({ name, description, image, text}) => {
    return (
        <div className="testimonial-card">
            <div className="star-rating">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
            </div>
            <p className='testimonial__text'>
                {text}
            </p>
            <div className="testimonial__lower-content">
                <div className="testimonial__lower-content--img">
                    <img src={image} alt={name} />
                </div>
                <div className="testimonial__lower-content--text">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard;