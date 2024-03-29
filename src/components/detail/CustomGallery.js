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
  const photos = data?.map((item) => {
    return {
      src: item.url,
      description: item.meta.map((metaItem) => (
        <div key={metaItem.key}>{`${metaItem.key}: ${metaItem.data}`}</div>
      )),
      title: "",
    };
  });

  const handleClose = () => {
    setIsGalleryOpen(false);
  };

  return (
    <>
      <Lightbox
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 10,
        }}
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
