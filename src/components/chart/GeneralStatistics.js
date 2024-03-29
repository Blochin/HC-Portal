import GlobalChart from "../chart/GlobalChart";
import TotalComponent from "../chart/TotalComponent";
import {
  TbAlignBoxBottomCenter,
  TbLock,
  TbKey,
  TbArchive,
} from "react-icons/tb";
import PropTypes from "prop-types";

function GeneralStatistics({ statistics }) {
  return (
    <div>
      <div>
        <h2>General Statistics</h2>
        <div className={"flex-wrap"}>
          <TotalComponent
            total={statistics.count.total}
            title={"All Records"}
            description="Number of Cryptograms and Cipher Keys"
            icon={TbAlignBoxBottomCenter}
          />
          <TotalComponent
            total={statistics.count.cipher_keys}
            title={"Cipher Keys"}
            description="Number of Cipher Keys"
            icon={TbKey}
          />
          <TotalComponent
            total={statistics.count.cryptograms}
            title={"Cryptograms"}
            description="Number of Cryptograms"
            icon={TbLock}
          />
          <TotalComponent
            total={statistics.count.archives}
            title={"Archives"}
            description="Number of archives"
            icon={TbArchive}
          />
        </div>
        <GlobalChart
          data={statistics.by_century.centuries}
          title={"Cipher Keys and Cryptograms By Centuries"}
        />
        <GlobalChart
          data={statistics.by_continent.continents}
          title={"Cipher Keys and Cryptograms By Continents"}
        />
        <GlobalChart
          data={statistics.by_language.languages}
          title={"Cipher Keys and Cryptograms By Languages"}
        />
        <GlobalChart
          data={statistics.by_symbols.symbols}
          title={"Cipher Keys and Cryptograms By Used Chars"}
        />
      </div>
    </div>
  );
}
GeneralStatistics.propTypes = {
  statistics: PropTypes.array.isRequired,
};
export default GeneralStatistics;
