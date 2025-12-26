
import React from 'react';

interface TopBannerProps {
  text: string;
}

const TopBanner: React.FC<TopBannerProps> = ({ text }) => {
  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden sticky top-0 z-50">
      <div className="animate-marquee whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default TopBanner;
