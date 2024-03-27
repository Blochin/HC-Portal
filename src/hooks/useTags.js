import { useState, useEffect } from "react";
import request from "../utils/api";

// eslint-disable-next-line no-unused-vars
const useTags = (model) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    request.get("api/tags?type=" + model).then((response) => {
      const tags = response.data.data.map((item) => {
        return { value: item.name };
      });
      setTags(tags);
    });
  }, []);

  return tags;
};

export default useTags;
