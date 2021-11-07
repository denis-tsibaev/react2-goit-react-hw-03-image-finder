import ImageGalleryItem from '../ImageGalleryItem';
import '../../styles.css';

const ImageGallery = ({ hits }) => (
    <ul className="ImageGallery">
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
            />
        ))}
    </ul>
);

export default ImageGallery;
