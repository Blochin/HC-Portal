import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Header from "../components/detail/Header";
import General from "../components/detail/General";
import { HiArchive, HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Description from "../components/detail/Description";
import CipherKeyImages from "../components/detail/CipherKeyImages";

function CryptogramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cipherKeyData, setCipherKeyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const url = `api/cipher-keys/${id}`;
    api.get(url).then((response) => {
      setCipherKeyData(response.data.data);
      setIsLoading(false);
      console.log(response.data.data);
    });
  }, [id]);

  const handleClone = () => {
    navigate(`/dashboard/cipher-keys/add/${id}`);
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
