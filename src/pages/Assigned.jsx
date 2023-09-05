import { useState, useEffect } from "react";
import BasicTable from "../components/BasicTable";
import apiService from "../services/apiService";

const Assigned = () => {
  const [tickets, setTickets] = useState([]);
  const [assignedValue, setAssignedvalue] = useState([]);


  const Assigneddisplay = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);
    setAssignedvalue(data);
    // console.log(data, "res");
  };

  useEffect(() => {
    Assigneddisplay();
  }, []);

  // console.log(assignedValue);



  const loadTickets = async () => {
    // const username = localStorage.getItem('username')
    // const result = await apiService.getAssignments(username)
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
const heading= ["project_Name","moduleId", "assignedTo","reportedBy","sprint","customerfound", "estimate_date", "status"]
  return (
    <>
      <BasicTable rows={assignedValue} heading={heading} handleClick={handleOpenTicket} />
    </>
  );
};

export default Assigned;

