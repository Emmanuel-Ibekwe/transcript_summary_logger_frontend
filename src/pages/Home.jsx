import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MainContent from "../components/Maincontent";
import Pagination from "../components/Pagination";
import Transcript from "../components/Transcript";
import Spinner from "../components/Spinner";
import ToggleButton from "../components/ToggleButton";
import { fetchTranscripts } from "../services/serviceApis";

const LIMIT = 10;
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsObject = Object.fromEntries(searchParams.entries());

  const { isSortedTranscripts, page } = paramsObject;
  const parsedPage = parseInt(page, 10);
  console.log("parsedPage: ", parsedPage);

  const [transcripts, setTranscripts] = useState([]);
  const [currentPage, setCurrentPage] = useState(parsedPage || 1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(
    isSortedTranscripts ? isSortedTranscripts : false
  );
  const [error, setError] = useState("");

  // page,
  // limit,
  // toggle,
  // accessToken,

  useEffect(() => {
    async function setStates() {
      console.log("Home");
      // setCurrentPage(parsedPage);
      const { loadingState, totalCountState, transcriptsState, errorState } =
        await fetchTranscripts(currentPage, LIMIT, toggle);
      setLoading(loadingState);
      setTotalCount(totalCountState);
      setTranscripts(transcriptsState);
      setError(errorState);
      console.log("Hello");
      setSearchParams({ page: currentPage, isSortedTranscripts: toggle });
      console.log("isSortedTranscripts: ", toggle);
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
              {transcripts.map((el, index) => (
                <Transcript
                  key={el.videoId}
                  videoId={el.videoId}
                  title={el.title}
                  url={el.url}
                  transcript={el.transcript}
                  summary={el.summary}
                  newsChannel={el.newsChannel}
                  removeActionSection={false}
                  toggle={toggle}
                  limit={LIMIT}
                  summaryPage={(currentPage - 1) * LIMIT + index + 1}
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
