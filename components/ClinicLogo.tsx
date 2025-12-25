
import React from 'react';

import Image from 'next/image';

export const ClinicLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <Image
      src="/logo.webp"
      alt="高健診所 Logo - 高雄小港腎臟專科"
      width={48}
      height={48}
      className={`${className} object-cover rounded-full`}
    />
  );
};
