import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: `grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 display-flex justify-content-center align-items-center z-0 transition-all duration-500`,
  img: `rounded-lg shadow-lg display-flex justify-content-center align-items-center cursor-pointer hover: hover:scale-105 transition-all duration-500`,
  popup: `w-[50%] bg-black bg-opacity-75 z-50 display-flex justify-content-center align-items-center rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`,
  bg: `bg-black bg-opacity-75 z-50 fixed top-0 left-0 w-full h-full`,

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

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div key={index} className={styles.item} style={{ height: `${image.height.medium}px`, position: `relative` }}>
          <img src={image.src.medium} alt={image.alt_description} className={styles.img} onClick={() => setClickedImage(image)} />
          <div className={styles.overlay} style={{ display: `none` }}>
            <div>
              <p className={`text-white text-3xl`}>Download</p>
            </div>
          </div>
        </div>
      ))}
      {clickedImage && (
        <div className={styles.bg} onClick={() => setClickedImage(null)}>
          <img src={clickedImage.src.original} alt={clickedImage.alt_description} className={styles.popup} />
        </div>
      )}
    </div>
  );
};

export default Container;
