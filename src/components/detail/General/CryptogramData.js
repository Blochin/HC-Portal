import PropTypes from "prop-types";
import { Badge, Table, Tooltip } from "flowbite-react";
import {
  HiOutlineGlobeEuropeAfrica,
  HiOutlineLanguage,
  HiOutlineNewspaper,
  HiOutlineQueueList,
  HiOutlineRectangleGroup,
} from "react-icons/hi2";
import {
  HiOutlineArchive,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlineKey,
  HiOutlineLibrary,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { parseDate } from "../../../utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../../../context/RepositoryContext";

const CryptogramData = ({ data }) => {
  const navigate = useNavigate();
  const { cipherKeyRepository } = useRepository();
  const [paired, setPaired] = useState(null);

  useEffect(() => {
    if (data?.cipher_key_id) {
      cipherKeyRepository.get(
        data?.cipher_key_id,
        () => {},
        (data) => {
          setPaired(data);
        },
        () => {},
      );
    }
  }, [data]);
  return (
    <>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Cryptogram Name"}>
                <HiOutlineNewspaper
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Cryptogram Name
            </Table.Cell>
            <Table.Cell>{data?.name}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Main Category"}>
                <HiOutlineRectangleGroup
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Main Category
            </Table.Cell>
            <Table.Cell>
              {data?.sub_category
                ? data?.sub_category?.name
                : data?.category?.name}
            </Table.Cell>
          </Table.Row>

          {data?.sub_category && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Sub Category"}>
                  <HiOutlineUserGroup
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Sub Category
              </Table.Cell>
              <Table.Cell>
                {data?.sub_category ? data?.category?.name : "Unknown"}
              </Table.Cell>
            </Table.Row>
          )}
          {data?.date && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Date"}>
                  <HiOutlineClock
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Date
              </Table.Cell>
              <Table.Cell>{parseDate(data.date)}</Table.Cell>
            </Table.Row>
          )}

          {data?.date_around && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Date"}>
                  <HiOutlineClock
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Used Around
              </Table.Cell>
              <Table.Cell>{data.date_around}</Table.Cell>
            </Table.Row>
          )}

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Language"}>
                <HiOutlineLanguage
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Language
            </Table.Cell>
            <Table.Cell>{data.language.name}</Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Location"}>
                <HiOutlineGlobeEuropeAfrica
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Location
            </Table.Cell>
            <Table.Cell>
              {data.location.continent +
                (data?.location?.name ? ", " + data?.location?.name : "")}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Used Chars"}>
                <HiOutlineLibrary
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Used Chars
            </Table.Cell>
            <Table.Cell>{data.used_chars ? data.used_chars : "N/A"}</Table.Cell>
          </Table.Row>
          {data?.folder?.fond?.archive ? (
            <>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Tooltip content={"Archive"}>
                    <HiOutlineArchive
                      className={
                        "me-2 border border-gray-400 rounded-full p-0.5"
                      }
                      size={28}
                    />
                  </Tooltip>
                  Archive
                </Table.Cell>
                <Table.Cell>{data.folder.fond.archive.name}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Tooltip content={"Fond"}>
                    <HiOutlineOfficeBuilding
                      className={
                        "me-2 border border-gray-400 rounded-full p-0.5"
                      }
                      size={28}
                    />
                  </Tooltip>
                  Fond
                </Table.Cell>
                <Table.Cell>{data.folder.fond.name}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Tooltip content={"Folder"}>
                    <HiOutlineFolder
                      className={
                        "me-2 border border-gray-400 rounded-full p-0.5"
                      }
                      size={28}
                    />
                  </Tooltip>
                  Folder
                </Table.Cell>
                <Table.Cell>{data.folder.name}</Table.Cell>
              </Table.Row>
            </>
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Availability"}>
                  <HiOutlineQueueList
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Availability
              </Table.Cell>
              <Table.Cell>{data?.availability}</Table.Cell>
            </Table.Row>
          )}

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className=" flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Sender"}>
                <HiOutlineUser
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Sender
            </Table.Cell>
            <Table.Cell>
              {data?.sender?.name ? data?.sender.name : "Unknown"}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Recipient"}>
                <HiOutlineUser
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Recipient
            </Table.Cell>
            <Table.Cell>
              {data.recipient?.name ? data.recipient.name : "Unknown"}
            </Table.Cell>
          </Table.Row>
          {data?.cipher_key_id && paired && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Paired Key"}>
                  <HiOutlineKey
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Paired Cipher Key
              </Table.Cell>
              <Table.Cell>
                <div className={"flex flex-wrap gap1"}>
                  <Badge
                    className={"cursor-pointer"}
                    onClick={() =>
                      navigate(`/dashboard/cipher-keys/${paired?.id}`)
                    }
                    color={"green"}
                  >
                    {paired?.name}
                  </Badge>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

CryptogramData.propTypes = {
  data: PropTypes.object,
};
export default CryptogramData;
