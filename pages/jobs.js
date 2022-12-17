import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";

import Board from "../src/components/Board";
import toast from "../src/components/Toast";

export default function Jobs() {
  const [allJobsState, setAllJobsState] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // If wallet is already connected...
  useEffect(() => {
    // fetchAllJobs();
  }, []);

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  // fetch all jobs
  async function fetchAllJobs() {}

  return (
    <div className="App">
      <Head>
        <title>join journey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? (
        <div className="loader-center">
          <div className="loader"></div>
        </div>
      ) : (
        allJobsState &&
        allJobsState.map(
          (job, index) =>
            job.employer != "0x0000000000000000000000000000000000000000" && (
              <div key={index}>
                <Board
                  id={index}
                  companyName={job.companyName}
                  position={job.position}
                  employmentType={job.employmentType}
                  location={job.location}
                  companyWebsiteUrl={job.companyWebsiteUrl}
                />
                <div style={{ marginTop: "15px" }}></div>
              </div>
            )
        )
      )}
    </div>
  );
}
