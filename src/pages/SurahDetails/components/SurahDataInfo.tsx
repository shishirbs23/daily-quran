import { SurahInfo } from "../../../core/models/SurahInfo";

type SurahInfoProps = {
  surahInfo: SurahInfo;
};

const SurahDataInfo = ({ surahInfo }: SurahInfoProps) => {
  return (
    <div
      className="pt-6"
      dangerouslySetInnerHTML={{ __html: surahInfo?.text ?? "" }}
    ></div>
  );
};

export default SurahDataInfo;
