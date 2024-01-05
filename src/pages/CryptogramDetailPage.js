import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/detail/Header";
import General from "../components/detail/General";
import { HiArchive, HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Groups from "../components/detail/Groups";
import Description from "../components/detail/Description";
import { useRepository } from "../context/RepositoryContext";

function CryptogramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptogramData, setCryptogramData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [galleryData, setGalleryData] = useState(null);
  const { cryptogramRepository } = useRepository();

  useEffect(() => {
    cryptogramRepository.get(
      id,
      (isLoading) => setIsLoading(isLoading),
      (data) => setCryptogramData(data),
      () => {},
    );
  }, [id]);

  useEffect(() => {
    handleGallery();
  }, [cryptogramData]);

  const handleClone = () => {
    navigate(`/dashboard/cryptograms/add/${id}`);
  };
  const handleEdit = () => {
    navigate(`/dashboard/cryptograms/edit/${id}`);
  };

  const handleGallery = () => {
    const data = cryptogramData?.datagroups?.flatMap((group) => {
      return group.data
        .filter((item) => item.type === "image")
        .map((imageItem) => ({
          url: imageItem.image.original,
          meta: [],
        }));
    });
    setGalleryData(data);
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
            galleryData={galleryData}
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
