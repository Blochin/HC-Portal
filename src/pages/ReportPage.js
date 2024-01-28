import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Tabs } from "flowbite-react";
import { TbLock, TbKey, TbArchive } from "react-icons/tb";
import GeneralStatistics from "../components/chart/GeneralStatistics";
import CryptogramStatistics from "../components/chart/CryptogramStatistics";
import CipherKeyStatistics from "../components/chart/CipherKeyStatistics";
import { HiClock } from "react-icons/hi";
import CustomTimeline from "../components/chart/timeline/CustomTimeline";
import useCryptograms from "../hooks/useCryptograms";
import { mapCryptogramData } from "../utils/helpers";
import useDataSort from "../hooks/useDataSort";
import { parseDateFromObject } from "../utils/utils";

function ReportPage() {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { cryptograms } = useCryptograms(false);
  const sortedCryptograms = useDataSort(
    cryptograms?.map((item) => mapCryptogramData(item)),
    {
      key: "date",
      direction: "ascending",
    },
    parseDateFromObject,
  );

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
            <Tabs.Item active={activeTab === 3} title="Timeline" icon={HiClock}>
              <CustomTimeline data={sortedCryptograms} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default ReportPage;
