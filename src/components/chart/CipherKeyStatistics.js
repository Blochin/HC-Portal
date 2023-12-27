import PropTypes from "prop-types";
import TotalComponent from "./TotalComponent";
import { TbArchive, TbKey, TbUser } from "react-icons/tb";
import CipherKeyChart from "./CipherKeyChart";
import CipherOneChart from "./CipherOneChart";

function CipherKeyStatistics({ statistics }) {
  console.log(statistics);
  return (
    <div>
      <div>
        <h2>Cryptogram Statistics</h2>
        <div className={"grid grid-col gap-2"}>
          <TotalComponent
            total={statistics.count.persons}
            title={"Persons"}
            description="Used Persons"
            icon={TbUser}
          />
          <TotalComponent
            total={statistics.count.archives}
            title={"Archives"}
            description="Used archives"
            icon={TbArchive}
          />
          <TotalComponent
            total={statistics.count.newest}
            title={"Newest"}
            description="Newest Cipher Key"
            icon={TbKey}
          />
          <TotalComponent
            total={statistics.count.oldest}
            title={"Oldest"}
            description="Oldest Cipher Key"
            icon={TbKey}
          />
        </div>
        <CipherKeyChart
          data={statistics.by_century.centuriesRows}
          title={"By Centuries"}
        />
        <CipherOneChart data={statistics.by_persons} title={"By Persons"} />
        <CipherOneChart
          data={statistics.by_symbols.symbols}
          title={"By Symbols"}
        />
      </div>
    </div>
  );
}
CipherKeyStatistics.propTypes = {
  statistics: PropTypes.array.isRequired,
};

export default CipherKeyStatistics;
