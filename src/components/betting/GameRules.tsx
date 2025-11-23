import { useState } from "react";
import type { GameCategory } from "../../types/api";
import { isMobile } from "react-device-detect";

interface GameRulesProps {
  category: GameCategory | null;
}

export const GameRules = ({ category }: GameRulesProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!category) {
    return null;
  }

  const toggleRules = () => {
    setIsOpen(!isOpen);
  };

  // Replace {{ODDS}} placeholder with actual rate value
  const formatGuideText = (guide: string, rate: number): string => {
    return guide.replace(/\{\{ODDS\}\}/g, rate.toString());
  };

  const formattedGuide = formatGuideText(category.guide, category.rate);

  if (isMobile) {
    return (
      <div className="guide-des">
        <h6 className="guide-t">
          Cược {category.name} - <span>1 ăn {category.rate}</span>
        </h6>
        <p dangerouslySetInnerHTML={{ __html: formattedGuide }} />
      </div>
    );
  }

  return (
    <div className="guide">
      <button className="btn btn-rule" onClick={toggleRules} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
        <span>
        Luật chơi
        </span>{" "}
        {isOpen && (
          <div className="guide-c" onClick={(e) => e.stopPropagation()}>
            <div className="guide-des">
              <h6 className="guide-t">
                Cược {category.name} - <span>1 ăn {category.rate}</span>
              </h6>
              <p dangerouslySetInnerHTML={{ __html: formattedGuide }} />
            </div>
          </div>
        )}
      </button>
    </div>
  );
};
