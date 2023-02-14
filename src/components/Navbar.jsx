import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const styles = {
  container: `w-full h-screen flex flex-col justify-between items-center p-11 transition-all duration-500`,
  title: `w-full flex justify-center items-end rotate-90 font-[Italiana] text-[40px] pl-20 transition-all duration-500`,
  titleOpen: `w-full flex justify-center items-center rotate-270 font-[Italiana] text-[40px]  transition-all duration-500`,
  menu: `flex justify-between flex-col h-[20px] cursor-pointer transition-all duration-500 my-auto `,
  menuOpen: `flex items-center justify-between flex-col h-[20px] cursor-pointer rotate-90 transition-all duration-500 h-[60%] w-[30%] sm:h-[50%] md:h-[80%]`,
  menuItem: `w-[50px] h-[4px] bg-[#000] rounded-full cursor-pointer transition-all duration-500`,
  menuItemOpen: `w-[200px] h-[4px] bg-[#000] rounded-full cursor-pointer transition-all duration-500 `,
  nav: `w-full flex flex-col justify-start items-center`,
  navItem: `cursor-pointer text-[#000] underline`,
  expandedNav: `transition-all duration-500`,
  contractedNav: `transition-all duration-500`,
  X: `w-full flex justify-start items-center z-[-1] absolute pl-11  cursor-pointer`,
  contractedX: `w-full flex justify-start items-center z-[-1] absolute display-none `,
  xx: `cursor-pointer`,
  menucontent: `w-screen max-h-40 md:max-h-96 flex flex-col justify-center items-center -rotate-90 transition-all duration-500 p-11 opacity-0 md:opacity-100 `,
  none: `hidden opacity-0`,
  smallContainer: ``,
  smallTitle: `font-bold text-lg md:text-xl text-center text-[12px]`,
  smallParagraph: `w-3/5 md:w-1/3 pt-3 text-center text-sm md:text-base text-[10px]`
};

const Navbar = ({ toggleNav, navOpen }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (navOpen) {
      setTimeout(() => {
        setOpacity(1);
      }, 500);
    } else {
      setOpacity(0);
    }
  }, [navOpen]);

  return (

    <div className={styles.container}>
      {navOpen ? <button onclick={toggleNav}className={styles.X}><AiOutlineClose size={32} onclick={toggleNav} /></button> : <div className={styles.contractedX}></div>}
       <div className={navOpen ? styles.titleOpen : styles.title}>Gallery</div>
      <div className={navOpen ? styles.menuOpen : styles.menu} onClick={toggleNav} >
        <div className={navOpen ? styles.menuItemOpen : styles.menuItem}></div>
        {navOpen ? <div className={styles.menucontent} style={{ opacity: opacity }}>
          <div className={styles.smallTitle}>A 4K Image Gallery powered by Pexels API</div>
          <div className={styles.smallParagraph}>This web portfolio project showcases a 4K image gallery utilizing the Pexels API. The gallery is filled with high-resolution images of various scenic landscapes, breathtaking cityscapes, and amazing wildlife, sourced from one of the world's largest photo libraries, Pexels.</div>
        </div> : <div className={styles.none}></div>}
        <div className={navOpen ? styles.menuItemOpen : styles.menuItem}></div>
      </div>
      <div className={styles.nav}>
        <div className={styles.navItem}>Pexels</div>
        <div className={styles.navItem}>Source</div>
        <div className={styles.navItem}>Portfolio</div>
      </div>
    </div>
  );

};

export default Navbar;
