import ImageGalleryItem from '../ImageGalleryItem';
import '../../styles.css';

const ImageGallery = ({ hits, onImageClick }) => (
    <ul className="ImageGallery">
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <li className="ImageGalleryItem" key={id}>
                <ImageGalleryItem
                    src={webformatURL}
                    alt={tags}
                    largeImage={largeImageURL}
                    onImageClick={onImageClick}
                />
            </li>
        ))}
    </ul>
);

export default ImageGallery;
