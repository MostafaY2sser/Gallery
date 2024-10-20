/* eslint-disable react/prop-types */
import "./ItemImage.scss";

const ItemImage = ({ handleOpen , photos }) => {
  return (
    <div className="image-gallery">
      {photos.map((image, index) => {
        return (
          <div key={index} className="imageWrapper">
            <img
                src={image.src}
                alt="Product image"
                className="imgGallery"
                loading="lazy"
                onClick={() => handleOpen(index)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ItemImage;
