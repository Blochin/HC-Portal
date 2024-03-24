import { useContext, useRef, useState } from "react";
import { DataContext } from "context/DataContext";
import CustomDropdown from "components/form/inputs/dropdown/Dropdown";
import { LAYOUT_LEFT, LAYOUT_RIGHT } from "../inputs/dropdown/trigger/Layout";
import PropTypes from "prop-types";
import { COLOR_FAILURE, COLOR_GRAY } from "../inputs/Colors";

const Categories = ({
  defaultValueMainCategory,
  defaultValueSubCategory,
  onChange,
  errorMessage,
}) => {
  const { categories, subCategories } = useContext(DataContext);
  const [filteredSubCategories, setFilteredSubcategories] = useState([]);
  const subcategoryRef = useRef();

  const handleCategories = (name, category) => {
    if (category?.value !== defaultValueMainCategory?.value) {
      subcategoryRef.current.reset();
    }
    if (!category) {
      onChange(name, null);
      setFilteredSubcategories([]);
      return;
    }
    onChange(name, category.id);

    let selectedSubCategories = subCategories.filter((value) => {
      return value.main_category === category.value;
    });

    if (selectedSubCategories.length === 0) {
      setFilteredSubcategories([]);
      return;
    }

    setFilteredSubcategories(selectedSubCategories[0].value);
  };

  return (
    <div className={"mb-6"}>
      <div className={"flex justify-center"}>
        <div className={"w-1/3"}>
          <CustomDropdown
            name={"category_id"}
            isRequired={true}
            label={"Main Category"}
            value={defaultValueMainCategory}
            layout={LAYOUT_LEFT}
            canAddNew={false}
            isMulti={false}
            withMeta={false}
            data={categories}
            onSelect={(name, value) => handleCategories(name, value)}
            color={errorMessage ? COLOR_FAILURE : COLOR_GRAY}
          />
        </div>
        <div className={"w-2/3"}>
          <CustomDropdown
            ref={subcategoryRef}
            name={"subcategory_id"}
            label={"Sub Category"}
            value={defaultValueSubCategory}
            layout={LAYOUT_RIGHT}
            canAddNew={false}
            isMulti={false}
            withMeta={false}
            data={filteredSubCategories}
            onSelect={(name, value) => onChange(name, value ? value.id : null)}
            color={errorMessage ? "failure" : "gray"}
          />
        </div>
      </div>
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </div>
  );
};

Categories.propTypes = {
  defaultValueMainCategory: PropTypes.string,
  defaultValueSubCategory: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default Categories;
