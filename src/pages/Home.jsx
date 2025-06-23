import axios from "axios";
import { useEffect, useState } from "react";
import MainContent from "../components/Maincontent";
import Pagination from "../components/Pagination";
import Transcript from "../components/Transcript";
import Spinner from "../components/Spinner";
import ToggleButton from "../components/ToggleButton";
import fetchTranscripts from "../services.js/fetchTranscripts";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRhYTdhMDNlYTBkMzJiM2Y1OTY3M2UiLCJlbWFpbCI6ImliZWt3ZWVtbWFudWVsMDA3QGdtYWlsLmNvbSIsImlhdCI6MTc1MDUwNTE5MiwiZXhwIjoxNzUwNTkxNTkyfQ.nne0ReiCsDJQ-cqy3gnRydmmSPQPLxfutNyUkN_T2es";
const LIMIT = 10;
const Home = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");

  // page,
  // limit,
  // toggle,
  // accessToken,
  // setLoading,
  // setTranscripts,
  // setTotalCount,
  // setError

  useEffect(() => {
    async function setStates() {
      const { loadingState, totalCountState, transcriptsState, errorState } =
        await fetchTranscripts(currentPage, LIMIT, false, ACCESS_TOKEN);
      setLoading(loadingState);
      setTotalCount(totalCountState);
      setTranscripts(transcriptsState);
      setError(errorState);
      console.log("Hello");
    }
    setStates();
  }, [currentPage, toggle]);

  return (
    <MainContent>
      <div>
        <div className="mx-auto max-w-3xl w-[90%] bg-white rounded-md p-5">
          <div className="flex w-full justify-end items-center space-x-2 text-sm">
            <span>Sort transcripts with summaries</span>
            <ToggleButton
              toggle={toggle}
              onToggle={() => setToggle((prev) => !prev)}
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="w-full">
              {transcripts.map((el) => (
                <Transcript
                  videoId={el.videoId}
                  title={el.title}
                  url={el.url}
                  transcript={el.transcript}
                  summary={el.summary}
                  newsChannel={el.newsChannel}
                  removeActionSection={false}
                />
              ))}

              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                totalCount={totalCount}
                siblingCount={1}
                currentPage={currentPage}
                pageSize={LIMIT}
              />
            </div>
          )}
        </div>
      </div>
    </MainContent>
  );
};

export default Home;
