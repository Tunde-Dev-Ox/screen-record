import './index.scss';
import { BiChevronDown } from 'react-icons/bi';


const FaqBar = ({question, answer, onToggle, isActive}) => {
    return (
        <div className="faq-questions--wrapper">
        <button onClick={onToggle}>
           <p className='faq-question'>
              {question}
           </p>
        <BiChevronDown className={`faq-icon ${isActive ? 'faq-active' : ''}`} />
        </button>
           <p className={`faq-answer ${isActive ? 'faq-active' : ''}`}>
              {answer}
           </p>
    </div>
    )
}

export default FaqBar;