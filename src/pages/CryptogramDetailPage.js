import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/detail/Header";
import { HiArchive, HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Groups from "../components/detail/Groups";
import Description from "../components/detail/Description";
import { useRepository } from "../context/RepositoryContext";
import api from "../utils/api";
import CryptogramData from "../components/detail/General/CryptogramData";
import { tabsTheme } from "../themes/TabsTheme";

function CryptogramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptogramData, setCryptogramData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [galleryData, setGalleryData] = useState(null);
  const { cryptogramRepository } = useRepository();
  const contentRef = useRef();

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

  const printPDF = () => {
    api
      .get(`api/cryptograms/export/${id}`, { responseType: "arraybuffer" })
      .then((response) => {
        console.log(response);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "cryptogram-export.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  const handleGallery = () => {
    let data = [];

    if (cryptogramData && cryptogramData.datagroups) {
      data = cryptogramData.datagroups.flatMap((group) => {
        return group.data
          .filter((item) => item.type === "image")
          .map((imageItem) => ({
            url: imageItem.image.original,
            meta: [],
          }));
      });
    }

    const thumbnail = { url: cryptogramData?.thumb, meta: [] };
    data = [...data, thumbnail];

    setGalleryData(data);
  };

  return (
    <div ref={contentRef}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header
            className={"mb-6"}
            image={
              cryptogramData.thumb
                ? cryptogramData.thumb
                : "/missing_image.jpeg"
            }
            data={cryptogramData}
            onEdit={handleEdit}
            onClone={handleClone}
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
              <CryptogramData data={cryptogramData} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 2}
              title="Description"
              icon={HiArchive}
            >
              <Description data={cryptogramData} truncate={false} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 1}
              title="Attachments"
              icon={HiDocumentDuplicate}
            >
              <Groups data={cryptogramData} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default CryptogramDetailPage;
