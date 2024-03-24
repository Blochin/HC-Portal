import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/detail/Header";
import { HiArchive, HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Description from "../components/detail/Description";
import CipherKeyImages from "../components/detail/CipherKeyImages";
import { useRepository } from "../context/RepositoryContext";
import api from "../utils/api";
import CipherKeyData from "../components/detail/General/CipherKeyData";
import { tabsTheme } from "../themes/TabsTheme";

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

      meta.push({
        key: "Structure",
        data: item.structure || "No",
      });

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

  const printPDF = () => {
    api
      .get(`api/cipher-keys/export/${id}`, { responseType: "arraybuffer" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "cipher-key-export.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header
            className={"mb-6"}
            data={cipherKeyData}
            image={cipherKeyData?.images?.[0]?.url.thumb}
            onClone={handleClone}
            onEdit={handleEdit}
            onExport={printPDF}
            galleryData={galleryData}
          />
          <Tabs
            theme={tabsTheme}
            color={"light"}
            aria-label="Default tabs"
            onActiveTabChange={(value) => setActiveTab(value)}
          >
            <Tabs.Item
              active={activeTab === 0}
              title="General"
              icon={HiDocumentText}
            >
              <CipherKeyData data={cipherKeyData} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 2}
              title="Description"
              icon={HiArchive}
            >
              <Description data={cipherKeyData} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 1}
              title="Attachments"
              icon={HiDocumentDuplicate}
            >
              <CipherKeyImages images={cipherKeyData?.images} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default CryptogramDetailPage;
