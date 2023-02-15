import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';

const styles = {
  container: `grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 display-flex justify-content-center align-items-center z-0 transition-all duration-500`,
  img: `rounded-lg shadow-lg display-flex justify-content-center align-items-center cursor-pointer hover: hover:scale-105 transition-all duration-500`,
  popup: `w-[50%] bg-black bg-opacity-75 z-40 display-flex justify-content-center align-items-center rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`,
  bg: `bg-black bg-opacity-75 z-50 fixed top-0 left-0 w-full h-full`,
  overlay: `absolute top-1/2 left-1/2 p-6 bg-white bg-opacity-50 z-50 flex justify-center items-center rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-75 transition-all duration-250`,
  close: `absolute top-5 left-5 w-10 h-10 flex justify-center items-center cursor-pointer text-white`,

};

const Container = () => {
  const [images, setImages] = useState([]);
  const [results, setResults] = useState(42);
  const [clickedImage, setClickedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=4k+wallpaper&per_page=${results}`, {
          headers: {
            Authorization: `IxnxFEnsT5AfxwDfo4tuBqXQf8i3Q14BjgoRyKIt7JMGgy55fdmVn6sa`
          }
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [results]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setResults(40)}
    else if (window.innerWidth < 1280) {
      setResults(42);
    }
    else if (window.innerWidth > 1536) {
      setResults(44);
    }
  }, []);

  const handleDownload = (e) => {
    e.stopPropagation();
    window.open(clickedImage.src.original, '_blank', 'noopener');
  };

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div key={index} className={styles.item} style={{ height: `${image.height.medium}px`, position: `relative` }}>
          <img src={image.src.medium} alt={image.alt_description} className={styles.img} onClick={() => setClickedImage(image)} />
          <div className={styles.overlay} style={{ display: `none` }}>
          </div>
        </div>
      ))}
      {clickedImage && (
        <div className={styles.bg}>
          <div className={styles.close} onClick={() => setClickedImage(null)}>
            <AiOutlineClose size={32} />
          </div>
          <img src={clickedImage.src.original} alt={clickedImage.alt_description} className={styles.popup}/>
          <div
            download={`${clickedImage.id}.jpg`}
            className={styles.overlay}
            title='Download 4K Image'
            onClick={handleDownload}
          >
            <IoCloudDownloadOutline size={64} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;