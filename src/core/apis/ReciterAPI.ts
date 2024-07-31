import { apiAlt } from "./configs/axiosConfigs";

export const ReciterAPI = {
  getAllReciters: async function () {
    const response = await apiAlt.request({
      url: `audio/reciters?locale=en`,
      method: "GET",
    });
    // returning the product returned by the API
    return response.data;
  },
  getSurahAudioData: async function (surahId: number, reciterId: number) {
    const response = await apiAlt.request({
      url: `audio/reciters/${reciterId}/audio_files?chapter=${surahId}&segments=true`,
      method: "GET",
    });
    // returning the product returned by the API
    return response.data;
  },
};
