import PropTypes from "prop-types";
import { Badge, Table, Tooltip } from "flowbite-react";
import {
  HiOutlineAdjustmentsVertical,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineLanguage,
  HiOutlineQueueList,
  HiOutlineRectangleGroup,
} from "react-icons/hi2";
import {
  HiOutlineArchive,
  HiOutlineClock,
  HiOutlineFolder,
  HiOutlineLibrary,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { parseDate } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../../../context/RepositoryContext";
import { useEffect, useState } from "react";

const CipherKeyData = ({ data }) => {
  const navigate = useNavigate();
  const { cryptogramRepository } = useRepository();
  const [paired, setPaired] = useState(null);
  useEffect(() => {
    if (data?.cryptograms_id) {
      const cryptograms = [];
      data?.cryptograms_id.forEach((id) => {
        cryptogramRepository.get(
          id,
          () => {},
          (cryptogram) => {
            cryptograms.push(cryptogram);
            if (cryptograms.length === data?.cryptograms_id?.length) {
              setPaired(cryptograms);
            }
          },
          () => {},
        );
      });
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

          {data?.used_from && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Date"}>
                  <HiOutlineClock
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>{" "}
                Date From
              </Table.Cell>
              <Table.Cell>{parseDate(data.used_from)}</Table.Cell>
            </Table.Row>
          )}
          {data?.used_to && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Date"}>
                  <HiOutlineClock
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>{" "}
                Date To
              </Table.Cell>
              <Table.Cell>{parseDate(data.used_to)}</Table.Cell>
            </Table.Row>
          )}
          {data?.used_around && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Date"}>
                  <HiOutlineClock
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>{" "}
                Used Around
              </Table.Cell>
              <Table.Cell>{data.used_around}</Table.Cell>
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

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Complete Structure"}>
                <HiOutlineLibrary
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Complete Structure
            </Table.Cell>
            <Table.Cell>
              {data?.complete_structure ? data.complete_structure : "Unknown"}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Tooltip content={"Key Type"}>
                <HiOutlineAdjustmentsVertical
                  className={"me-2 border border-gray-400 rounded-full p-0.5"}
                  size={28}
                />
              </Tooltip>
              Key Type
            </Table.Cell>
            <Table.Cell>
              {data?.key_type?.name ? data.key_type?.name : "Unknown"}
            </Table.Cell>
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
          {data?.users?.length > 0 &&
          data?.users?.some((item) => item.is_main_user) ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Main Users"}>
                  <HiOutlineUser
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Main Users
              </Table.Cell>
              <Table.Cell className="">
                <div className={"flex flex-wrap gap-2"}>
                  {data.users.map((user, index) => {
                    return user.is_main_user ? (
                      <Badge
                        color={user.is_main_user === 1 ? "yellow" : "light"}
                        key={`main-${index}`}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {user.person.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </Table.Cell>
            </Table.Row>
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Main Users"}>
                  <HiOutlineUser
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Main Users
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    color={"yellow"}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {"Unknown"}
                  </Badge>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
          {data?.users?.length > 0 &&
          data?.users?.some((item) => !item.is_main_user) ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Users"}>
                  <HiOutlineUser
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Users
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-2">
                  {data.users.map((user, index) => {
                    return !user.is_main_user ? (
                      <Badge
                        color={user.is_main_user === 1 ? "yellow" : "light"}
                        key={`common-${index}`}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {user.person.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </Table.Cell>
            </Table.Row>
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Users"}>
                  <HiOutlineUser
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Users
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    color={"light"}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {"Unknown"}
                  </Badge>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
          {data?.cryptograms_id && paired && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="flex flex-row  whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Tooltip content={"Paired Cryptogram"}>
                  <HiOutlineLockClosed
                    className={"me-2 border border-gray-400 rounded-full p-0.5"}
                    size={28}
                  />
                </Tooltip>
                Paired Cryptograms
              </Table.Cell>
              <Table.Cell>
                <div className={"flex flex-wrap gap-1"}>
                  {paired?.map((cryptogram, index) => (
                    <Badge
                      key={index}
                      className={"cursor-pointer"}
                      onClick={() =>
                        navigate(`/dashboard/cryptograms/${cryptogram?.id}`)
                      }
                      color={"green"}
                    >
                      {cryptogram?.name}
                    </Badge>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

CipherKeyData.propTypes = {
  data: PropTypes.object,
};

export default CipherKeyData;
