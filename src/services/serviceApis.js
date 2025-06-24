import api from "./axiosInstance";

export const fetchTranscripts = async (page, limit, toggle) => {
  let loadingState, totalCountState, transcriptsState, errorState;

  try {
    const response = await api.get(
      `/transcripts?page=${page}&isSortedTranscripts=${toggle}&limit=${limit}`
    );
    console.log(response.data);
    console.log(response);

    if (response.data.transcripts.length > 0) {
      loadingState = false;
    }
    totalCountState = response.data.totalTranscripts;
    transcriptsState = response.data.transcripts;
    errorState = null;
    return { loadingState, totalCountState, transcriptsState, errorState };
  } catch (error) {
    console.log(error);
    loadingState = false;
    errorState = error.response.data.message;
    return { loadingState, totalCountState, transcriptsState, errorState };
  }
};
