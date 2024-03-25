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
import { mapCipherKeyData, mapCryptogramData } from "../utils/helpers";
import useDataSort from "../hooks/useDataSort";
import { parseDateFromObject } from "../utils/utils";
import { tabsTheme } from "../themes/TabsTheme";
import useCipherKeys from "../hooks/useCipherKeys";

function ReportPage() {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { cryptograms } = useCryptograms(false);
  const { cipherKeys } = useCipherKeys(false);
  const sortedCryptograms = useDataSort(
    cryptograms?.map((item) => mapCryptogramData(item)),
    {
      key: "date",
      direction: "ascending",
    },
    parseDateFromObject,
  );

  const sortedCipherKeys = useDataSort(
    cipherKeys?.map((item) => mapCipherKeyData(item)),
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
            theme={tabsTheme}
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
            <Tabs.Item
              active={activeTab === 3}
              title="Cryptogram Timeline"
              icon={HiClock}
            >
              <CustomTimeline data={sortedCryptograms} model={"cryptograms"} />
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === 4}
              title="Cipher Keys Timeline"
              icon={HiClock}
            >
              <CustomTimeline data={sortedCipherKeys} model={"cipher-keys"} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default ReportPage;
