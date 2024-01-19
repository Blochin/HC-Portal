import { Accordion } from "flowbite-react";
import PropTypes from "prop-types";
const Groups = ({ data }) => {
  return (
    <Accordion alwaysOpen={true}>
      {data.datagroups.map((group, index) => {
        return (
          <Accordion.Panel key={index}>
            <Accordion.Title>{group.description}</Accordion.Title>
            <Accordion.Content className={"p-3 px-5"}>
              {group.data.map((data, index) => {
                return (
                  <div key={index}>
                    <div>
                      <h1 className={"font-bold"}>{data.title}</h1>
                      <a className={"text-blue-600"} href={data.link}>
                        {data.link}
                      </a>
                      <p>{data.text}</p>
                      {data.image && <img src={data.image.thumb} />}
                    </div>
                    <div className={"border-b-2 mt-4 mb-2"}></div>
                  </div>
                );
              })}
            </Accordion.Content>
          </Accordion.Panel>
        );
      })}
    </Accordion>
  );
};

Groups.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Groups;
