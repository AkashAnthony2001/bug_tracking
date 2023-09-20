import { useState, useEffect } from "react";
import BasicTableSub from "../components/BasicTableSub";
import apiService from "../services/apiService";

const Submitted = () => {
  const [submitedValue, setSubmissions] = useState([]);

  const SubmitedDisplay = async () => {
    const username = localStorage.getItem('username')
    const data = await apiService.getSubmissions(username);
    setSubmissions(data);


  };
  useEffect(() => {
    SubmitedDisplay();
  }, []);

  const headers = ["BugId", "Assigned To", "Sprint", "Estimate Date", "Created Date", "Status", "More Info"];

  return (
    <>
      <BasicTableSub row={submitedValue} headers={headers} />
    </>
  );
};

export default Submitted;
