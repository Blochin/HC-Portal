import { parseDate } from "../utils/utils";

export const mapCryptogramData = (item) => {
  let newProperties = {};
  if (item.category) {
    newProperties.category = item.category.name;
    if (item.category.children) {
      newProperties.sub_category = item.category.children.name;
    }
  }
  if (item.language) {
    newProperties.language = item.language.name;
  }
  if (item.location) {
    newProperties.location =
      item.location.continent + " " + item.location.name
        ? item.location.continent
        : "";
  }
  if (item.availability_type === "archive") {
    newProperties.availability =
      item.folder?.name +
      " " +
      item.folder?.fond?.name +
      " " +
      item.folder?.fond?.archive?.name;
  }
  newProperties.users =
    (item.recipient ? item.recipient.name : "") +
    (item.recipient && item.sender ? " " : "") +
    (item.sender ? item.sender.name : "");

  newProperties.state = item?.state?.title;

  newProperties.date = item.date ? parseDate(item.date) : item?.date_around;

  if (item.solution) {
    newProperties.solution = item.solution.name;
  }

  return { ...item, ...newProperties };
};

export const mapCipherKeyData = (item) => {
  let newProperties = {};
  if (item.category) {
    newProperties.category = item.category.name;
    if (item.category.children) {
      newProperties.sub_category = item.category.children.name;
    }
  }
  if (item.language) {
    newProperties.language = item.language.name;
  }
  if (item.location) {
    newProperties.location =
      item.location.continent + " " + item.location.name
        ? item.location.continent
        : "";
  }
  if (item.availability_type === "archive") {
    newProperties.availability =
      item.folder?.name +
      " " +
      item.folder?.fond?.name +
      " " +
      item.folder?.fond?.archive?.name;
  }
  newProperties.users =
    (item.recipient ? item.recipient.name : "") +
    (item.recipient && item.sender ? " " : "") +
    (item.sender ? item.sender.name : "");

  newProperties.state = item?.state?.title;

  newProperties.date = item.used_from
    ? parseDate(item.used_from)
    : item?.date_around;
  newProperties.key_type = item.key_type.name;
  newProperties.thumb = item?.images?.[0]?.url?.thumb;

  if (item.solution) {
    newProperties.solution = item.solution.name;
  }

  return { ...item, ...newProperties };
};
