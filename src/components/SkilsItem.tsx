import React from 'react';
import { Calendar, Building2, MapPin, BadgeCheck } from 'lucide-react';

interface Props {
  title: string;
  year?: string;
  date?: string;
  description: string;
  institution?: string;
  location?: string;
  badge?: string;
  certificationLink?: string;
}

const SkillsItem = ({ 
  title, 
  year,
  date,
  description, 
  institution,
  location,
  badge,
  certificationLink 
}: Props) => {
  // Usamos date o year, lo que esté disponible
  const displayDate = date || year;

  return (
    <div className="relative group">
      <div className="relative bg-background-secondary rounded-xl p-6 shadow-lg 
        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          {/* Date Badge */}
          {displayDate && (
            <div className="flex items-center gap-2 bg-primary/10 text-primary 
              px-3 py-1 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {displayDate}
            </div>
          )}

          {/* Certification Badge */}
          {badge && (
            <div className="flex items-center gap-1 bg-complementary/10 text-complementary
              px-3 py-1 rounded-full text-sm font-medium">
              <BadgeCheck className="w-4 h-4" />
              {badge}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2
          bg-gradient-to-r from-primary to-complementary bg-clip-text text-transparent">
          {title}
        </h3>

        {/* Institution */}
        {institution && (
          <div className="flex items-center gap-2 text-foreground/70 mb-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm">{institution}</span>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-foreground/70 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{location}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Certificate Link */}
        {certificationLink && (
          <a 
            href={certificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary 
              hover:text-complementary transition-colors duration-300"
          >
            Ver certificado
            <svg 
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}

        {/* Decorative Element */}
        <div className="absolute -right-2 -bottom-2 w-24 h-24 bg-gradient-to-br 
          from-primary/5 to-complementary/5 rounded-br-xl -z-10 
          transition-all duration-300 group-hover:scale-110" />
      </div>
    </div>
  );
};

export default SkillsItem;