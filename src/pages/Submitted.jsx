import { useState, useEffect } from "react";
import BasicTableSub from "../components/BasicTableSub";
import apiService from "../services/apiService";

const Submitted = () => {
  // const [tickets, setTickets] = useState([]);
  const [submitedValue, setSubmissions] = useState([]);

  const SubmitedDisplay = async () => {
    const username = localStorage.getItem('username')
    // console.log(username);
    const data = await apiService.getSubmissions(username);
    setSubmissions(data);
    // console.log(data, "res");

    
  };
  useEffect(() => {
    SubmitedDisplay();
  }, []);
  // console.log(submitedValue)

  const loadTickets = async () => {
    // const username = localStorage.getItem('username')
    // const result = await apiService.getSubmissions(username)
    // setTickets(result)
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const [openTicket, setOpenTicket] = useState({ open: false, id: null });

  const handleOpenTicket = (id = null) => {
    setOpenTicket({
      open: true,
      id: id,
    });
  };
  const headers = ["Project Name","Module Name","Assigned To","Reported By","Sprint","Customer Found","Estimate Date","Created By","Created Date","Status"];

  return (
    <>
      <BasicTableSub row={submitedValue} headers={headers}  handleClick={handleOpenTicket} openTicket={openTicket}/>
    </>
  );
};

export default Submitted;
