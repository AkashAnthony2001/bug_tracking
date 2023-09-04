import { useState, useEffect } from "react";
import BasicTable from "../components/BasicTable";
import TicketCard from "../components/TicketCard";
import apiService from "../services/apiService";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Assigned = () => {
  const [tickets, setTickets] = useState([]);
  const [assignedValue, setAssignedvalue] = useState([]);


  const Assigneddisplay = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);
    setAssignedvalue(data);
    console.log(data, "res");
  };

  useEffect(() => {
    Assigneddisplay();
  }, []);

  console.log(assignedValue);



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
      {/* {openTicket.open ? (
        <TicketCard
          ticketId={openTicket.id}
          projectTitle={
            tickets.find((ticket) => ticket.id === openTicket.id).route
          }
        />
      ) : null} */}

    </>
  );
};

export default Assigned;

