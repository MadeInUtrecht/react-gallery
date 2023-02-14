import React, { useState } from 'react';
import Container from './Container';
import Navbar from './Navbar';

const styles = {
  mainContainer: `w-screen h-screen flex flex-row`,
  container: `w-11/12 h-screen overflow-y-scroll transition-all duration-500 ease-in-out p-11`,
  closedContainer: `w-[0px] h-[0px] transition-all duration-500 p-0`,
  navdiv: `w-1/12 h-screen flex flex-col border-l border-gray-200 bg-white justify-between items-center p-11 transition-all duration-500`,
  openNavdiv: `w-screen h-screen transition-all duration-500`
};

const Main = () => {
  const [navOpen, setNavOpen] = useState(false); // false = closed, true = open

  const toggleNav = () => {
    setNavOpen(!navOpen);
  }; // toggle navOpen state

  return (
    <div className={styles.mainContainer}>
      <div className={navOpen ? styles.closedContainer : styles.container}>
        <Container />
      </div>
      <div className={navOpen ? styles.openNavdiv : styles.navdiv} onClick={toggleNav}>
        <Navbar toggleNav={toggleNav} navOpen={navOpen} />
      </div>
    </div>
  );
};

export default Main;
