import '../../styles.css';

const ImageGalleryItem = ({ key, src, alt, largeImage }) => (
    <li key={key} className="ImageGalleryItem">
        <img
            src={src}
            alt={alt}
            width="300"
            height="300"
            className="ImageGalleryItem-image"
        />
    </li>
);

export default ImageGalleryItem;
