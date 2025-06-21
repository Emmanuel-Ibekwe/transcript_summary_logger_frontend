import axios from "axios";

const fetchTranscripts = async (page, limit, toggle, accessToken) => {
  try {
    const response = await axios.get(
      `https://transcript-summarizer-1.onrender.com/api/v1/transcripts?page=${page}&sortTranscripts=${toggle}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    console.log(response);
    let loadingState, totalCountState, transcriptsState, errorState;
    if (response.data.transcripts.length > 0) {
      loadingState = false;
    }
    totalCountState = response.data.totalTranscripts;
    transcriptsState = response.data.transcripts;
    errorState = null;
    return { loadingState, totalCountState, transcriptsState, errorState };
  } catch (error) {
    console.log(error.message);
    loadingState = false;
    errorState = error.message;
    return { loadingState, totalCountState, transcriptsState, errorState };
  }
};

export default fetchTranscripts;
