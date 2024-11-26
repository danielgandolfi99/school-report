import Image from 'next/image';

const logo = '/assets/images/logo.jpg';

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  return (
    <>
      <Image src={logo} alt="Logo" width={118} height={35} />
    </>
  );
};

export default LogoIcon;
