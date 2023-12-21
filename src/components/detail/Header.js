import PropTypes from "prop-types";
import { Badge, Button } from "flowbite-react";

// eslint-disable-next-line no-unused-vars
const Header = ({ className, image, title, tags, onClone, onExport }) => {
  return (
    <div className={className}>
      <div className="bg-gray-300 p-5">
        <div className="flex flex-col md:flex-row gap-4 justify-start md:items-center">
          <div className="w-full md:w-auto">
            <img src={image} alt={title} className="max-w-full" />
          </div>
          <div className="flex flex-col w-full justify-center">
            <div className="mb-6">
              <div className="text-xl font-semibold">{title}</div>
              <div className="flex flex-row gap-2 mb-4">
                {tags.map((tag, index) => (
                  <Badge color={"light"} key={index}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2">
                <Button size={"xs"} onClick={onClone}>
                  Clone
                </Button>
                <Button size={"xs"}>Export PDF</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.array,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  onClone: PropTypes.func,
  onExport: PropTypes.func,
};

export default Header;
