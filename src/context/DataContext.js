import React, { createContext, useState, useEffect } from "react";
import request from "utils/api";

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

  useEffect(() => {
    request
      .get("api/locations/continents")
      .then((response) => {
        const continents = response.data.data.map((item) => {
          return { value: item.name };
        });

        const locations = response.data.data.map((item) => {
          return { continent: item.name, location: item.location };
        });

        setContinents(continents);
        setLocations(locations);
      })
      .catch((error) => console.error("Error fetching continents:", error));

    request
      .get("api/locations")
      .then((response) => {
        const locations = response.data.data.map((item) => {
          return {
            continent: item.continent,
            location: item.name,
          };
        });
        setLocations(locations);
      })
      .catch((error) => console.error("Error fetching continents:", error));

    request
      .get("api/tags")
      .then((response) => {
        const tags = response.data.data.map((item) => {
          return { value: item.name };
        });
        setTags(tags);
      })
      .catch((error) => console.error("Error fetching tags:", error));

    request
      .get("api/categories")
      .then((response) => {
        const categories = response.data.data.map((item) => {
          return { id: item.id, value: item.name };
        });

        setCategories(categories);

        const subCategories = response.data.data.map((item) => {
          const modifiedChildren = item.children.map((child) => {
            return { ...child, value: child.name };
          });

          return { main_category: item.name, value: modifiedChildren };
        });

        setSubCategories(subCategories);
      })
      .catch((error) => console.error("Error fetching tags:", error));

    request
      .get("api/archives")
      .then((response) => {
        const archives = response.data.data.map((item) => {
          return { value: item.name };
        });

        const fonds = response.data.data.map((item) => {
          const modifiedChildren = item.fonds.map((child) => {
            return { ...child, value: child.name };
          });
          return { archive: item.name, value: modifiedChildren };
        });

        const folders = response.data.data.map((item) => {
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

        setArchives(archives);
        setFolders(folders);
        setFonds(fonds);
      })
      .catch((error) => console.error("Error fetching tags:", error));

    request
      .get("api/persons")
      .then((response) => {
        const persons = response.data.data.map((item) => {
          return { value: item.name };
        });
        setPersons(persons);
      })
      .catch((error) => console.error("Error fetching tags:", error));

    request
      .get("api/solutions")
      .then((response) => {
        const solutions = response.data.data.map((item) => {
          return { id: item.id, value: item.name };
        });
        setSolutions(solutions);
      })
      .catch((error) => console.error("Error fetching tags:", error));

    request
      .get("api/languages")
      .then((response) => {
        const languages = response.data.data.map((item) => {
          return { id: item.id, value: item.name };
        });
        setLanguages(languages);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

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
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
