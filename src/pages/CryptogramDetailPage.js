import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/detail/Header";
import General from "../components/detail/General";
import { HiArchive, HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Groups from "../components/detail/Groups";
import Description from "../components/detail/Description";
import CryptogramRepository from "../repository/CryptogramRepository";

function CryptogramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptogramData, setCryptogramData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const cryptogramRepository = new CryptogramRepository();

  useEffect(() => {
    cryptogramRepository.get(
      id,
      (isLoading) => setIsLoading(isLoading),
      (data) => setCryptogramData(data),
      () => {},
    );
  }, [id]);

  const handleClone = () => {
    navigate(`/dashboard/cryptograms/add/${id}`);
  };
  const handleEdit = () => {
    navigate(`/dashboard/cryptograms/edit/${id}`);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header
            className={"mb-6"}
            title={cryptogramData.name}
            image={cryptogramData.thumb}
            tags={cryptogramData.tags}
            onClone={handleClone}
            state={cryptogramData.state.title}
            note={cryptogramData.note}
            onEdit={handleEdit}
            createdBy={cryptogramData.created_by}
          />
          <Tabs
            color={"light"}
            aria-label="Default tabs"
            onActiveTabChange={(value) => setActiveTab(value)}
          >
            <Tabs.Item
              active={activeTab === 0}
              title="General"
              icon={HiDocumentText}
            >
              <General data={cryptogramData} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 1}
              title="Groups"
              icon={HiDocumentDuplicate}
            >
              <Groups data={cryptogramData} />
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === 2}
              title="Description"
              icon={HiArchive}
            >
              <Description data={cryptogramData} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default CryptogramDetailPage;
