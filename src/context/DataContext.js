import React, { createContext, useState, useEffect } from "react";
import request from "utils/api";
import { useUser } from "./UserContext";

export const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const [continents, setContinents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [archives, setArchives] = useState([]);
  const [fonds, setFonds] = useState([]);
  const [folders, setFolders] = useState([]);
  const [persons, setPersons] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [keyTypes, setKeyTypes] = useState([]);

  const [allCryptogramHeaders] = useState([
    "name",
    "category",
    "availability",
    "location",
    "language",
    "date",
    "solution",
    "users",
  ]);
  const [myAllCryptogramHeaders] = useState([...allCryptogramHeaders, "state"]);
  const [allCipherKeyHeaders] = useState([
    "name",
    "category",
    "used_chars",
    "structure",
    "availability",
    "language",
    "date",
    "location",
    "users",
  ]);
  const [myAllCipherKeyHeaders] = useState([...allCipherKeyHeaders, "state"]);

  const [lessCryptogramHeaders] = useState(["name", "language", "date"]);
  const [myLessCryptogramHeaders] = useState([
    ...lessCryptogramHeaders,
    "state",
  ]);
  const [lessCipherKeyHeaders] = useState(["name", "language", "date"]);
  const [myLessCipherKeyHeaders] = useState([...lessCipherKeyHeaders, "state"]);

  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }
    request.get("api/configuration").then((response) => {
      const continents = response.data.continents.map((item) => {
        return { value: item.name };
      });

      const locations = response.data.locations.map((item) => {
        return {
          continent: item.continent,
          location: item.name,
        };
      });

      const tags = response.data.tags.map((item) => {
        return { value: item.name };
      });

      const categories = response.data.categories.map((item) => {
        return { id: item.id, value: item.name };
      });

      const subCategories = response.data.categories.map((item) => {
        const modifiedChildren = item.children.map((child) => {
          return { ...child, value: child.name };
        });

        return { main_category: item.name, value: modifiedChildren };
      });

      const archives = response.data.archives.map((item) => {
        return { value: item.name };
      });

      const fonds = response.data.archives.map((item) => {
        const modifiedChildren = item.fonds.map((child) => {
          return { ...child, value: child.name };
        });
        return { archive: item.name, value: modifiedChildren };
      });

      const folders = response.data.archives.map((item) => {
        const modifiedChildren = item.fonds.map((child) => {
          const modifiedSubChildren = child.folders.map((subChild) => {
            return { ...subChild, value: subChild.name };
          });
          return { ...child, value: modifiedSubChildren };
        });
        return {
          archive_id: item.id,
          archive: item.name,
          value: modifiedChildren,
        };
      });

      const persons = response.data.persons.map((item) => {
        return { value: item.name };
      });

      const solutions = response.data.solutions.map((item) => {
        return { id: item.id, value: item.name };
      });

      const languages = response.data.languages.map((item) => {
        return { id: item.id, value: item.name };
      });

      const keyTypes = response.data.key_types.map((item) => {
        return { id: item.id, value: item.name };
      });

      setKeyTypes(keyTypes);
      setLanguages(languages);
      setSolutions(solutions);
      setPersons(persons);
      setArchives(archives);
      setFolders(folders);
      setFonds(fonds);
      setCategories(categories);
      setSubCategories(subCategories);
      setTags(tags);
      setLocations(locations);
      setContinents(continents);
    });
  }, [user]);

  const contextValue = {
    continents,
    locations,
    tags,
    categories,
    subCategories,
    archives,
    fonds,
    folders,
    persons,
    solutions,
    languages,
    keyTypes,
    allCryptogramHeaders,
    myAllCryptogramHeaders,
    allCipherKeyHeaders,
    myAllCipherKeyHeaders,
    lessCryptogramHeaders,
    myLessCryptogramHeaders,
    lessCipherKeyHeaders,
    myLessCipherKeyHeaders,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
