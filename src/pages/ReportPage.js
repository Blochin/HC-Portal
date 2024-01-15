import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Tabs } from "flowbite-react";
import { TbLock, TbKey, TbArchive } from "react-icons/tb";
import GeneralStatistics from "../components/chart/GeneralStatistics";
import CryptogramStatistics from "../components/chart/CryptogramStatistics";
import CipherKeyStatistics from "../components/chart/CipherKeyStatistics";

function ReportPage() {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const url = `api/statistics`;
    api.get(url).then((response) => {
      setStatistics(response.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Tabs
            color={"light"}
            aria-label="Default tabs"
            onActiveTabChange={(value) => setActiveTab(value)}
          >
            <Tabs.Item
              active={activeTab === 0}
              title="General Statistics"
              icon={TbArchive}
            >
              <GeneralStatistics statistics={statistics.global} />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 1}
              title="Cryptogram Statistics"
              icon={TbLock}
            >
              <CryptogramStatistics statistics={statistics.cryptograms} />
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === 2}
              title="Cipher Key Statistics"
              icon={TbKey}
            >
              <CipherKeyStatistics statistics={statistics.cipher_keys} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default ReportPage;
