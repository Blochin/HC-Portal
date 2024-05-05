import PropTypes from "prop-types";
import TotalComponent from "./TotalComponent";
import { TbArchive, TbKey, TbUser } from "react-icons/tb";
import CipherKeyChart from "./CipherKeyChart";
import CipherOneChart from "./CipherOneChart";

function CipherKeyStatistics({ statistics }) {
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
            title={"Newest Cipher Key"}
            description="Newest Cipher Key"
            icon={TbKey}
          />
          <TotalComponent
            total={statistics.count.oldest}
            title={"Oldest Cipher Key"}
            description="Oldest Cipher Key"
            icon={TbKey}
          />
        </div>
        <CipherOneChart
          data={statistics.by_category.categories}
          title={"Cipher Keys By Categories"}
          type={"Cipher Key"}
        />
        <CipherOneChart
          data={statistics.century.centuries}
          title={"Cipher Keys By Centuries"}
          type={"Cipher Key"}
        />
        <CipherOneChart
          data={statistics.structure.structure}
          title={"Cipher Keys By Structure"}
          type={"Cipher Key"}
        />
        <CipherKeyChart
          data={statistics.by_century.centuriesRows}
          title={"Used Chars in Cipher Keys By Centuries"}
        />
        <CipherOneChart
          data={statistics.by_persons}
          title={"The 10 Most Frequent Names in Cryptograms (Key Users)"}
          type={"Cipher Key"}
        />
        <CipherOneChart
          data={statistics.by_symbols.symbols}
          title={"Cipher Keys By Used Ciphertext Elements"}
          type={"Cipher Key"}
        />
      </div>
    </div>
  );
}

CipherKeyStatistics.propTypes = {
  statistics: PropTypes.array.isRequired,
};

export default CipherKeyStatistics;
