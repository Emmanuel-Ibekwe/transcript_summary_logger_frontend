import axios from "axios";
import { useEffect, useState } from "react";
import MainContent from "../components/Maincontent";
import Pagination from "../components/Pagination";
import Transcript from "../components/Transcript";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRhYTdhMDNlYTBkMzJiM2Y1OTY3M2UiLCJlbWFpbCI6ImliZWt3ZWVtbWFudWVsMDA3QGdtYWlsLmNvbSIsImlhdCI6MTc1MDQxODMxOCwiZXhwIjoxNzUwNTA0NzE4fQ.ETbno1Djt15ackMR2KgO87iFX9Ovdh7Tx5sYGdAC9jw";
const LIMIT = 10;
const Home = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTranscripts = async (page) => {
    try {
      const response = await axios.get(
        `https://transcript-summarizer-1.onrender.com/api/v1/transcripts?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response.data);

      setTranscripts(response.data.transcripts);
      setTotalCount(response.data.totalTranscripts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTranscripts(currentPage);
    console.log("Hello");
  }, [currentPage]);

  return (
    <MainContent>
      <div>
        <ul className="mx-auto max-w-3xl w-[90%] bg-white rounded-md">
          {transcripts.map((el) => (
            <Transcript
              key={el.videoId}
              title={el.title}
              url={el.url}
              transcript={el.transcript}
              summary={el.summary}
              newsChannel={el.newsChannel}
            />
          ))}
        </ul>
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          totalCount={totalCount}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={LIMIT}
        />
      </div>
    </MainContent>
  );
};

export default Home;
