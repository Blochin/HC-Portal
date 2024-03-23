import { useState, useEffect } from "react";
import request from "../utils/api";

const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    request.get("api/tags").then((response) => {
      const tags = response.data.data.map((item) => {
        return { value: item.name };
      });
      setTags(tags);
    });
  }, []);

  return tags;
};

export default useTags;
