import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainContent from "../components/Maincontent";
import Transcript from "../components/Transcript";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { fetchTranscripts } from "../services/serviceApis";
import ReadMore from "../components/ReadMore";
import Pagination from "../components/Pagination";
import api from "../services/axiosInstance";

const AddSummary = () => {
  // const transcript.summary =
  //   "Under the golden sunset, children played by the riverbank, their laughter echoing through the valley. Birds soared overhead, casting fleeting shadows on the water. An old man watched from a wooden bench, his cane resting beside him. The air smelled of pine and damp earth, whispering stories of the past. Peace lingered in every breath, still and timeless.";
  const LIMIT = 1;
  const MIN_SUMMARY_LENGTH = 30;
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const { isSortedTranscripts, page } = paramsObject;
  const parsedPage = parseInt(page, 10);

  const [transcript, setTranscript] = useState({});
  const [currentPage, setCurrentPage] = useState(parsedPage);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(
    transcript.summary?.length >= MIN_SUMMARY_LENGTH ? false : true
  );
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleSubmit = async () => {
    if (transcript.summary?.length >= MIN_SUMMARY_LENGTH && !isSubmit) {
      setIsSubmit(true);
      setTextAreaValue(transcript.summary);
      return;
    }

    const payload = { summary: textAreaValue.trim() };
    try {
      setIsSubmitting(true);
      const response = await api.post(
        `/${transcript._id}/add-summary`,
        payload
      );

      console.log(response.data);
      const uploadedSummary = response.data.summary;
      const updatedTranscript = { ...transcript, summary: uploadedSummary };
      setIsSubmit(false);
      setTranscript(updatedTranscript);
      if (uploadedSummary) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError(error.response.data.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page, isSortedTranscripts });
    setIsSubmit(
      transcript.summary?.length >= MIN_SUMMARY_LENGTH ? false : true
    );
  };

  const handleChangeTextArea = (e) => {
    setTextAreaValue(e.target.value);
  };

  useEffect(() => {
    async function setStates() {
      const { loadingState, totalCountState, transcriptsState, errorState } =
        await fetchTranscripts(currentPage, LIMIT, isSortedTranscripts);
      setLoading(loadingState);
      setTotalCount(totalCountState);

      if (transcriptsState.length > 0) {
        setTranscript(transcriptsState[0]);
      } else {
        setTranscript(null);
      }

      if (transcriptsState[0].summary) {
        setTextAreaValue(transcriptsState[0].summary);
      } else {
        setTextAreaValue("");
      }

      setIsSubmit(
        transcriptsState[0].summary?.length >= MIN_SUMMARY_LENGTH ? false : true
      );

      setError(errorState);
      // console.log("Hello");
      // console.log("transcriptState: ", transcriptsState);
      // console.log(
      //   "transcriptsState.summary?.length >= MIN_SUMMARY_LENGTH: ",
      //   transcriptsState[0].summary?.length >= MIN_SUMMARY_LENGTH
      // );
      // console.log(
      //   "transcriptsState.summary?.length: ",
      //   transcriptsState.summary[0]?.length
      // );
      // console.log("isSubmit 1: ", isSubmit);
    }
    setStates();
  }, [currentPage]);

  console.log("isSubmit 2: ", isSubmit);
  console.log("transcript: ", transcript);

  return (
    <MainContent>
      {loading ? (
        <Spinner />
      ) : !error ? (
        <>
          <div className="mx-auto max-w-3xl w-[90%] bg-white rounded-md px-5 pb-5 pt-6">
            <div className="max-w-[90%] mx-auto">
              <p className="hover:font-bold hover:border-2 hover:cursor-pointer flex w-6 h-6 rounded-full items-center justify-center border text-lg">
                &#8592;
              </p>
            </div>
            <Transcript
              videoId={transcript.videoId}
              title={transcript.title}
              url={transcript.url}
              transcript={transcript.transcript}
              summary={transcript.summary}
              newsChannel={transcript.newsChannel}
              removeActionSection={true}
            />
            <div className="max-w-[80%] mx-auto p-4">
              <label
                htmlFor={`summary-${"dddd"}`}
                className="font-bold text-lg pb-2"
              >
                Summary
              </label>
              {transcript.summary?.length >= MIN_SUMMARY_LENGTH && !isSubmit ? (
                <ReadMore text={transcript.summary} isCopyRemoved={true} />
              ) : (
                <textarea
                  className="bg-[#e0e0e0] w-full h-30 resize-none p-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-auto overflow-x-hidden"
                  name=""
                  id={`summary-${"dddd"}`}
                  value={textAreaValue}
                  onChange={handleChangeTextArea}
                />
              )}
              {
                <div className="flex justify-end">
                  <Button isSubmit={true} onClick={handleSubmit}>
                    {isSubmitting
                      ? "Submitting..."
                      : isSubmit
                      ? "Submit"
                      : "Edit Summary"}
                  </Button>
                </div>
              }
            </div>
            <Pagination
              totalCount={totalCount}
              pageSize={LIMIT}
              siblingCount={1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <p className="text-red-500 px-5">{error}</p>
      )}
    </MainContent>
  );
};

export default AddSummary;
