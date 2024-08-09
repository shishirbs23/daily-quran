import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const VerseAPI = {
  getBySurah: async function (surahNumber: number, cancel = false) {
    const response = await api.request({
      url: `/verses/by_chapter/${surahNumber}?words=true&fields=text_uthmani,chapter_id,hizb_number&word_fields=text_uthmani&per_page=50`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.getBySurah.name].handleRequestCancellation()
            .signal
        : undefined,
    });

    return response.data;
  },
  getByPage: async function (pageNumber: number, cancel = false) {
    const response = await api.request({
      url: `/verses/by_page/${pageNumber}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.getBySurah.name].handleRequestCancellation()
            .signal
        : undefined,
    });

    return response.data;
  },
  getByJuz: async function (juzNumber: number, cancel = false) {
    const response = await api.request({
      url: `/verses/by_juz/${juzNumber}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.getBySurah.name].handleRequestCancellation()
            .signal
        : undefined,
    });

    return response.data;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(VerseAPI);
