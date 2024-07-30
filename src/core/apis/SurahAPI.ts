import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const SurahAPI = {
  getSurah: async function (id: number, cancel = false) {
    const response = await api.request({
      url: `/chapters/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.getSurah.name].handleRequestCancellation().signal
        : undefined,
    });

    // returning the product returned by the API
    return response;
  },
  getSurahInfo: async function (id: number, cancel = false) {
    const response = await api.request({
      url: `/chapters/${id}/info`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.getSurahInfo.name].handleRequestCancellation()
            .signal
        : undefined,
    });

    // returning the product returned by the API
    return response;
  },
  getAllSurahs: async function (cancel = false) {
    const response = await api.request({
      url: "/chapters",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getAllSurahs.name].handleRequestCancellation()
            .signal
        : undefined,
    });

    return response.data.chapters;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(SurahAPI);
