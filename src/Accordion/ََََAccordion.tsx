import React, { useState } from "react";
import "./Accordion.css";
import CircleMinus from "../svg/CircleMinus";
import CirclePlus from "../svg/CirclePlus";

interface AccordionProps {
  title: string;
  info: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <div className="header">
        <h4>{title}</h4>
        <button className="question-btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? (
            <CircleMinus width={20} height={20} color="#000" />
          ) : (
            <CirclePlus width={20} height={20} color="#000" />
          )}
        </button>
      </div>
      {showInfo && <p className="answer">{info}</p>}
    </article>
  );
};

export default Accordion;
