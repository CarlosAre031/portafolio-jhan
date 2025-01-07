import React from "react";

interface SkillItem {
  name: string;
  level: string;
}

interface Props {
  skill1: string;
  skill2: string;
  skill3: string;
  level1: string;
  level2: string;
  level3: string;
  additionalSkills?: SkillItem[];
}

const SkillsLanguage = ({
  level1,
  level2,
  level3,
  skill1,
  skill2,
  skill3,
  additionalSkills
}: Props) => {
  const getPercentage = (level: string) => {
    const match = level.match(/\d+/);
    return match ? match[0] + '%' : '0%';
  };

  const mainSkills = [
    { name: skill1, level: level1 },
    { name: skill2, level: level2 },
    { name: skill3, level: level3 },
  ];

  const allSkills = additionalSkills 
    ? [...mainSkills, ...additionalSkills]
    : mainSkills;

  return (
    <div className="relative">
      <div className={`space-y-6 ${allSkills.length > 3 ? 'h-[300px] overflow-y-auto pr-4' : ''}`}>
        {allSkills.map((skill, index) => (
          <div key={index} className="relative group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-foreground font-semibold">{skill.name}</span>
              <span className="text-foreground/70 text-sm">
                {getPercentage(skill.level)}
              </span>
            </div>
            <div className="h-2 w-full bg-background/20 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ease-out rounded-full ${skill.level} transform origin-left group-hover:scale-x-105`}
                style={{
                  backgroundColor: index % 3 === 0 ? 'var(--primary)' : 
                                index % 3 === 1 ? 'var(--complementary)' : 
                                'var(--secondary)',
                  boxShadow: `0 0 10px ${index % 3 === 0 ? 'var(--primary)' : 
                                       index % 3 === 1 ? 'var(--complementary)' : 
                                       'var(--secondary)'}`
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {allSkills.length > 3 && (
        <div className="absolute right-0 top-0 bottom-0 w-2 hover:w-3 transition-all duration-300">
          <div className="h-full w-full rounded-full bg-background/10">
            <div className="h-1/3 w-full rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsLanguage;