import { parseHumanDate } from "./utils";

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
    newProperties.location = parseLocation(
      item?.location?.continent,
      item?.location?.name,
    );
  }
  if (item.availability_type === "archive") {
    newProperties.availability =
      item.folder?.name +
      " " +
      item.folder?.fond?.name +
      " " +
      item.folder?.fond?.archive?.name;
  }
  newProperties.users = parseUsers(item?.sender?.name, item?.recipient?.name);

  newProperties.state = item?.state?.title;

  newProperties.tags =
    item?.tags?.length !== 0
      ? item?.tags?.map((tag) => {
          return tag?.name;
        })
      : ["Unknown"];

  newProperties.date = item.date
    ? parseHumanDate(item.date)
    : item?.date_around
      ? item?.date_around
      : "Unknown";

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
    newProperties.location = parseLocation(
      item?.location?.continent,
      item?.location?.name,
    );
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
    item?.users?.length !== 0
      ? item?.users?.map((user) => {
          return user?.person?.name;
        })
      : ["Unknown"];

  newProperties.state = item?.state?.title;

  newProperties.date = parseFromToDate(
    item?.used_from,
    item?.used_to,
    item?.used_around,
  );
  newProperties.key_type = item.key_type.name;
  newProperties.thumb = item?.images?.[0]?.url?.thumb;

  newProperties.tags =
    item?.tags?.length !== 0
      ? item?.tags?.map((tag) => {
          return tag?.name;
        })
      : ["Unknown"];

  if (item.solution) {
    newProperties.solution = item.solution.name;
  }

  if (item.complete_structure) {
    newProperties.structure = item.complete_structure;
  }

  return { ...item, ...newProperties };
};

const parseFromToDate = (from, to, around) => {
  if (from && to) {
    return (
      <div>
        {"From " + parseHumanDate(from)}
        <br />
        {"To " + parseHumanDate(to)}
      </div>
    );
  }
  if (from) {
    return "From " + parseHumanDate(from);
  }
  if (to) {
    return "To " + parseHumanDate(from);
  }
  if (around) {
    return around;
  }
  return "Unknown";
};

const parseUsers = (sender, recipient) => {
  if (sender !== "Unknown" && recipient !== "Unknown") {
    return [sender, recipient];
  }
  if (sender !== "Unknown" && recipient === "Unknown") {
    return [sender];
  }
  if (sender === "Unknown" && recipient !== "Unknown") {
    return [recipient];
  }
  return ["Unknown"];
};

const parseLocation = (continent, place) => {
  if (continent && place) {
    return continent + " " + place;
  } else if (continent && !place) {
    return continent;
  } else if (!continent) {
    return "";
  }
  return " ";
};
