import React, { useState } from "react";
import FaqBar from "./FaqBars";
import './index.scss';

const Faq = ({faqData = []}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <div className="faqbars-wrapper">
            {faqData.map((faq, index) => (
                <FaqBar
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isActive={activeIndex === index}
                    onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                />
            ))}
        </div>
    );
}

export default Faq;