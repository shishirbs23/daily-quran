import { SurahInfo } from "../../../core/models/SurahInfo";

type SurahInfoProps = {
  surahInfo: SurahInfo;
};

const SurahDataInfo = ({ surahInfo }: SurahInfoProps) => {
  return (
    <div
      className="m-auto w-10/12 pt-6"
      dangerouslySetInnerHTML={{ __html: surahInfo?.text ?? "" }}
    ></div>
  );
};

export default SurahDataInfo;
