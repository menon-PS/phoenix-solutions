import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/siteContent';
import { useCmsValue } from '../services/supabaseService';

interface PhoenixLogoProps {
  className?: string;
  size?: number;
  /** Optional highlight of a specific chevron tier (0 = bottom/Tech, 1 = mid/People, 2 = top/Strategy) */
  activeTier?: 0 | 1 | 2 | null;
  /** Display mode: both 'emblem' and 'chevron' render the Phoenix Solutions White & Aqua Logo */
  variant?: 'emblem' | 'chevron';
  title?: string;
}

const TIER_BORDER_COLORS: Record<0 | 1 | 2, string> = {
  0: '#034078',
  1: '#0077b6',
  2: '#00b4d8',
};

export const PhoenixLogo: React.FC<PhoenixLogoProps> = ({
  className = '',
  size = 40,
  activeTier = null,
  title = 'Phoenix Strategic Evolution — Phoenix Solutions Aqua & White Logo',
}) => {
  const dynamicLogo = useCmsValue('logo_emblem_url', ASSETS.logoEmblem);
  const [imgSrc, setImgSrc] = useState<string>(dynamicLogo);

  useEffect(() => {
    setImgSrc(dynamicLogo);
  }, [dynamicLogo]);

  const handleImageError = () => {
    if (imgSrc !== ASSETS.logoEmblemFallback) {
      setImgSrc(ASSETS.logoEmblemFallback);
    }
  };

  const borderColor =
    activeTier !== null ? TIER_BORDER_COLORS[activeTier] : 'rgba(0, 119, 182, 0.32)';

  return (
    <div
      style={{
        width: size,
        height: size,
        borderColor,
      }}
      className={`logo-frame-3d relative shrink-0 select-none rounded-lg overflow-hidden p-0.5 ${className}`}
    >
      <img
        src={imgSrc}
        alt={title}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        className="w-full h-full object-contain block"
      />
    </div>
  );
};
