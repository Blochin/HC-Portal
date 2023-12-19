import { useContext, useState } from "react";
import { DataContext } from "context/DataContext";
import CustomDropdown from "components/form/inputs/dropdown/Dropdown";
import { LAYOUT_LEFT, LAYOUT_RIGHT } from "../inputs/dropdown/trigger/Layout";
import PropTypes from "prop-types";
import { COLOR_FAILURE, COLOR_GRAY } from "../inputs/Colors";

const Categories = ({
  onChangeMainCategory,
  onChangeSubCategory,
  errorMessage,
}) => {
  const { categories, subCategories } = useContext(DataContext);
  const [filteredSubCategories, setFilteredSubcategories] = useState([]);

  const handleCategories = (name, category) => {
    if (!category) {
      onChangeMainCategory(name, null);
      setFilteredSubcategories([]);
      return;
    }
    let selectedSubCategories = subCategories.filter((value) => {
      return value.main_category === category.value;
    });

    if (selectedSubCategories.length === 0) {
      setFilteredSubcategories([]);
      return;
    }

    setFilteredSubcategories(selectedSubCategories[0].value);
    onChangeMainCategory(name, category.id);
  };

  return (
    <div className={"mb-6"}>
      <div className={"flex justify-center"}>
        <div className={"w-1/3"}>
          <CustomDropdown
            name={"category_id"}
            label={"Main Category"}
            value=""
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
            name={"subcategory_id"}
            label={"Sub Category"}
            value={""}
            layout={LAYOUT_RIGHT}
            canAddNew={false}
            isMulti={false}
            withMeta={false}
            data={filteredSubCategories}
            onSelect={(name, value) =>
              onChangeSubCategory(name, value ? value.id : null)
            }
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
  onChangeMainCategory: PropTypes.func.isRequired,
  onChangeSubCategory: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default Categories;
