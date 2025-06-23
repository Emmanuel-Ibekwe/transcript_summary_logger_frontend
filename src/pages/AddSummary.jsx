import { useState, useEffect } from "react";
import MainContent from "../components/Maincontent";
import Transcript from "../components/Transcript";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import fetchTranscripts from "../services.js/fetchTranscripts";
import ReadMore from "../components/ReadMore";
import Pagination from "../components/Pagination";

const AddSummary = () => {
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRhYTdhMDNlYTBkMzJiM2Y1OTY3M2UiLCJlbWFpbCI6ImliZWt3ZWVtbWFudWVsMDA3QGdtYWlsLmNvbSIsImlhdCI6MTc1MDY1MjkzMCwiZXhwIjoxNzUwNzM5MzMwfQ.vkrpqi97msf2F2puh-_-JV8UNRSU_i1pnlA9X0lrpLA";
  const LIMIT = 1;

  const [transcript, setTranscript] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // page,
  //   limit,
  //   accessToken,
  //   setLoading,
  //   setTranscripts,
  //   setTotalCount,
  //   setError

  useEffect(() => {
    async function setStates() {
      const { loadingState, totalCountState, transcriptsState, errorState } =
        await fetchTranscripts(currentPage, LIMIT, false, ACCESS_TOKEN);
      setLoading(loadingState);
      setTotalCount(totalCountState);
      if (transcriptsState.length > 0) {
        setTranscript(transcriptsState[0]);
      } else {
        setTranscript(null);
      }

      setError(errorState);
      console.log("Hello");
    }
    setStates();
  }, [currentPage]);

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
              {transcript.summary >= 200 ? (
                <ReadMore text={transcript.summary >= 200} />
              ) : (
                <textarea
                  className="bg-[#e0e0e0] w-full h-30 resize-none p-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-auto overflow-x-hidden"
                  name=""
                  id={`summary-${"dddd"}`}
                />
              )}
              <div>
                {transcript.summary >= 200 ? (
                  <Button isSubmit={true} onClick={() => {}}>
                    Submit
                  </Button>
                ) : (
                  <Button isSubmit={false} onClick={() => {}}>
                    {transcript.summary >= 200 ? "Edit Summary" : "Submit"}
                  </Button>
                )}
              </div>
            </div>
            <Pagination
              totalCount={totalCount}
              pageSize={LIMIT}
              siblingCount={1}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
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
