'use client';

import Image from 'next/image';

const logo = '/assets/images/logo.jpg';
// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  return (
    <>
      <Image src={logo} alt="Logo" width={118} height={35} />
    </>
  );
};

export default LogoMain;
