import { useState, useEffect } from "react";
import MainContent from "../components/Maincontent";
import Transcript from "../components/Transcript";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import fetchTranscripts from "../services.js/fetchTranscripts";

const AddSummary = () => {
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRhYTdhMDNlYTBkMzJiM2Y1OTY3M2UiLCJlbWFpbCI6ImliZWt3ZWVtbWFudWVsMDA3QGdtYWlsLmNvbSIsImlhdCI6MTc1MDUwNTE5MiwiZXhwIjoxNzUwNTkxNTkyfQ.nne0ReiCsDJQ-cqy3gnRydmmSPQPLxfutNyUkN_T2es";
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
      setTranscript(transcriptsState[0]);
      setError(errorState);
      console.log("Hello");
    }
    setStates();
  }, [currentPage]);

  return (
    <MainContent>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mx-auto max-w-3xl w-[90%] bg-white rounded-md p-5">
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
              <label htmlFor={`summary-${"dddd"}`}>Summary</label>
              <textarea
                className="bg-[#ccc] w-full"
                name=""
                id={`summary-${"dddd"}`}
              />
              <div>
                {transcript.summary >= 200 ? (
                  <Button isSubmit={true} onClick={() => {}}>
                    Submit
                  </Button>
                ) : (
                  <Button isSubmit={false} onClick={() => {}}>
                    Edit Summary
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </MainContent>
  );
};

export default AddSummary;
