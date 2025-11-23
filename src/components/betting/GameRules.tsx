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
      <button className="btn" onClick={toggleRules} type="button">
        <i className="fas fa-question-circle"></i> Luật chơi
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
