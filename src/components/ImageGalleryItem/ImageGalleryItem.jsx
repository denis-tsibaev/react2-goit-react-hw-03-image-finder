import '../../styles.css';

const ImageGalleryItem = ({ src, alt, largeImage, onImageClick }) => (
    <img
        src={src}
        alt={alt}
        width="300"
        height="300"
        onClick={() => onImageClick(largeImage)}
        className="ImageGalleryItem-image"
    />
);

export default ImageGalleryItem;
