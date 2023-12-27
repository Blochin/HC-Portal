import PropTypes from "prop-types";
import TotalComponent from "./TotalComponent";
import { TbLock, TbArchive, TbUser } from "react-icons/tb";
import CryptogramChart from "./CryptogramChart";
import CryptogramOneChart from "./CryptogramOneChart";
import CipherOneChart from "./CipherOneChart";

function CryptogramStatistics({ statistics }) {
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
            total={statistics.count.senders}
            title={"Senders"}
            description="Total Senders"
            icon={TbUser}
          />
          <TotalComponent
            total={statistics.count.recipients}
            title={"Recipients"}
            description="Total Recipients"
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
            description="Newest Cryptogram"
            icon={TbLock}
          />
          <TotalComponent
            total={statistics.count.oldest}
            title={"Oldest"}
            description="Oldest Cryptogram"
            icon={TbLock}
          />
        </div>
        <CryptogramChart
          data={statistics.by_century.centuriesRows}
          title={"By Centuries"}
        />
        <CryptogramChart
          data={statistics.by_continent.locationsRows}
          title={"By Continents"}
        />
        <CipherOneChart data={statistics.by_persons} title={"By Persons"} />
        <CryptogramOneChart
          data={statistics.by_symbols.symbols}
          title={"By Symbols"}
        />
      </div>
    </div>
  );
}
CryptogramStatistics.propTypes = {
  statistics: PropTypes.array.isRequired,
};
export default CryptogramStatistics;
