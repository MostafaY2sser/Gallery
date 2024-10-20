
import "./gallery.scss";
import { photos } from "../../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft , faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import ItemImage from "../ItemImage/ItemImage";


const Gallery = () => {

    // لإhe current slide image index 
  const [slideImage, setSlideImage] = useState(0);

    // The gallery open or close 
  const [openGallery, setOpenGallery] = useState(false);

  // Reference for the gallery
  const galleryRef = useRef(null);


  // Function to open the image slider
  const handleOpen = (index) => {
    setSlideImage(index);
    setOpenGallery(true);
  };


  //  Function to move the slider image left or right
  const handleMove = (direction) => {
    let newSlideNumber = slideImage;
    if (direction === "left") {
      newSlideNumber =
        newSlideNumber === 0 ? photos.length - 1 : newSlideNumber - 1;
    } else {
      newSlideNumber =
        newSlideNumber === photos.length - 1 ? 0 : newSlideNumber + 1;
    }
    setSlideImage(newSlideNumber);
  };


  // Function to close the Gallery
  const handleCloseGallery = ()=> {
    setOpenGallery(false);
  }


  // Close the gallery when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicked outside the gallery
      if (galleryRef.current && !galleryRef.current.contains(event.target)) {
        handleCloseGallery();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        handleCloseGallery();
      }
    };

    if (openGallery) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapePress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [openGallery]);


  return (
    <div className="gallery"   dir="rtl" >
      <div className="container">
        {openGallery && (
          <div className="slide"  ref={galleryRef}>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-gallery"
              onClick={()=> handleCloseGallery() }
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              className="arrow left"
              onClick={() => handleMove("left")}
            />
            <div className="sliderWrapper">
              <img
                src={photos[slideImage].src}
                alt="Product Image"
                className="slideImg"  
                loading="lazy"
              />
            </div>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="arrow  right"
              onClick={() => handleMove("right")}
            />
          </div>
        )}

        <ItemImage  handleOpen={handleOpen}  photos={photos}/>
      </div>
    </div>
  );
};

export default Gallery;
