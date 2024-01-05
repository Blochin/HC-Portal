import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/detail/Header";
import General from "../components/detail/General";
import { HiArchive, HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Description from "../components/detail/Description";
import CipherKeyImages from "../components/detail/CipherKeyImages";
import { useRepository } from "../context/RepositoryContext";

function CryptogramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cipherKeyData, setCipherKeyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [galleryData, setGalleryData] = useState(null);

  const { cipherKeyRepository } = useRepository();

  useEffect(() => {
    cipherKeyRepository.get(
      id,
      (isLoading) => setIsLoading(isLoading),
      (data) => setCipherKeyData(data),
      () => {},
    );
  }, [id]);

  useEffect(() => {
    handleGallery();
  }, [cipherKeyData]);

  const handleClone = () => {
    navigate(`/dashboard/cipher-keys/add/${id}`);
  };

  const handleEdit = () => {
    navigate(`/dashboard/cipher-keys/edit/${id}`);
  };
  const handleGallery = () => {
    const data = cipherKeyData?.images?.map((item) => {
      const meta = [];

      // Mapping the "structure" key
      meta.push({
        key: "Structure",
        data: item.structure || "No",
      });

      // Mapping the "has_instructions" key
      meta.push({
        key: "Instructions",
        data: item.has_instructions ? "Yes" : "No",
      });

      return {
        url: item.url.thumb,
        meta,
      };
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
            title={cipherKeyData.name}
            image={cipherKeyData?.images?.[0]?.url.thumb}
            tags={cipherKeyData.tags}
            onClone={handleClone}
            state={cipherKeyData.state.title}
            note={cipherKeyData.note}
            onEdit={handleEdit}
            createdBy={cipherKeyData.created_by}
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
              <General data={cipherKeyData} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 1}
              title="Attachments"
              icon={HiDocumentDuplicate}
            >
              <CipherKeyImages images={cipherKeyData?.images} />
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === 2}
              title="Description"
              icon={HiArchive}
            >
              <Description data={cipherKeyData} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default CryptogramDetailPage;
