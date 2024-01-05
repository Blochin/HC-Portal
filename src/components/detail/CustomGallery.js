//import PhotoAlbum from "react-photo-album";
import PropTypes from "prop-types";
import Lightbox from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const CustomGallery = ({ data, isGalleryOpen, setIsGalleryOpen }) => {
  // eslint-disable-next-line no-unused-vars

  const photos = data?.map((item) => {
    let width = "600";
    let height = "800";

    return {
      src: item.url,
      width,
      height,
      description: item.meta.map((metaItem) => (
        <div key={metaItem.key}>{`${metaItem.key}: ${metaItem.data}`}</div>
      )),
      title: "",
    };
  });
  console.log(photos);
  console.log(photos.length);
  const handleClose = () => {
    setIsGalleryOpen(false);
    console.log(isGalleryOpen);
  };

  return (
    <>
      {/*<PhotoAlbum
        layout="rows"
        photos={photos}
        sizes={{ size: "calc(100vw - 240px)" }}
        onClick={({ index }) => setIndex(index)}
      />*/}
      <Lightbox
        slides={photos}
        open={isGalleryOpen}
        index={photos?.length - 1}
        close={handleClose}
        plugins={[Captions, Fullscreen, Slideshow, Zoom, Thumbnails]}
      />
    </>
  );
};

CustomGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      meta: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  isGalleryOpen: PropTypes.bool.isRequired,
  setIsGalleryOpen: PropTypes.func.isRequired,
};

export default CustomGallery;
