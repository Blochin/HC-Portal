import { Badge, Table } from "flowbite-react";
import PropTypes from "prop-types";
import { parseDate } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { useNavigate } from "react-router-dom";

const General = ({ data }) => {
  const navigate = useNavigate();
  const { cipherKeyRepository, cryptogramRepository } = useRepository();
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
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.cipher_key_id && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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

          {data?.cryptograms_id && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Main Category
            </Table.Cell>
            <Table.Cell>{data?.category?.name}</Table.Cell>
          </Table.Row>
          {data?.category?.children?.length > 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Sub Category
              </Table.Cell>
              <Table.Cell>
                <div className={"flex flex-wrap gap-1"}>
                  {data?.category?.children?.map((subCategory, index) => (
                    <Badge color={"light"} key={index}>
                      {subCategory?.name}
                    </Badge>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          )}
          {data?.date && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Date
              </Table.Cell>
              <Table.Cell>{parseDate(data.date)}</Table.Cell>
            </Table.Row>
          )}
          {data?.used_from && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Date From
              </Table.Cell>
              <Table.Cell>{parseDate(data.used_from)}</Table.Cell>
            </Table.Row>
          )}
          {data?.used_to && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Date To
              </Table.Cell>
              <Table.Cell>{parseDate(data.used_to)}</Table.Cell>
            </Table.Row>
          )}
          {data?.date_around && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Date Around
              </Table.Cell>
              <Table.Cell>{data.date_around}</Table.Cell>
            </Table.Row>
          )}
          {data?.used_around && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Used Around
              </Table.Cell>
              <Table.Cell>{data.used_around}</Table.Cell>
            </Table.Row>
          )}
          {data?.language.name && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Language
              </Table.Cell>
              <Table.Cell>{data.language.name}</Table.Cell>
            </Table.Row>
          )}
          {data?.location.continent && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Continent
              </Table.Cell>
              <Table.Cell>{data.location.continent}</Table.Cell>
            </Table.Row>
          )}
          {data?.location.name && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Location
              </Table.Cell>
              <Table.Cell>{data.location.name}</Table.Cell>
            </Table.Row>
          )}
          {data?.used_chars && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Used chars
              </Table.Cell>
              <Table.Cell>{data.used_chars}</Table.Cell>
            </Table.Row>
          )}
          {data?.folder?.fond?.archive ? (
            <>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Folder
                </Table.Cell>
                <Table.Cell>{data.folder.name}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Fond
                </Table.Cell>
                <Table.Cell>{data.folder.fond.name}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Archive
                </Table.Cell>
                <Table.Cell>{data.folder.fond.archive.name}</Table.Cell>
              </Table.Row>
            </>
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Availability
              </Table.Cell>
              <Table.Cell>{data?.availability}</Table.Cell>
            </Table.Row>
          )}
          {data?.users?.length > 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Users
              </Table.Cell>
              <Table.Cell className="flex flex-wrap gap-2">
                {data.users.map((user, index) => (
                  <Badge
                    color={user.is_main_user === 1 ? "yellow" : "light"}
                    key={index}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {user.person.name}
                  </Badge>
                ))}{" "}
              </Table.Cell>
            </Table.Row>
          )}
          {data?.sender?.name && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Sender
              </Table.Cell>
              <Table.Cell>{data?.sender?.name}</Table.Cell>
            </Table.Row>
          )}
          {data?.recipient?.name && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Recipient
              </Table.Cell>
              <Table.Cell>{data.recipient.name}</Table.Cell>
            </Table.Row>
          )}
          {data?.complete_structure && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Complete Structure
              </Table.Cell>
              <Table.Cell>{data.complete_structure}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

General.propTypes = {
  data: PropTypes.array.isRequired,
};

export default General;
