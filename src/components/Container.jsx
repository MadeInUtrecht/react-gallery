import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: `grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 display-flex justify-content-center align-items-center z-0 transition-all duration-500`,
  img: `overflow-hidden rounded-lg shadow-lg display-flex justify-content-center align-items-center cursor-pointer `,

};

const Container = () => {
  const [images, setImages] = useState([]);
  const [results, setResults] = useState(42);

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
          <img src={image.src.medium} alt={image.alt_description} className={styles.img} />
          <div className={styles.overlay} style={{ display: `none` }}>
            <div>
              <p className={`text-white text-3xl`}>Download</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Container;
