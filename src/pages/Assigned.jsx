import { useState, useEffect } from "react";
import BasicTable from "../components/BasicTable";
import apiService from "../services/apiService";

const Assigned = () => {
  const [assignedValue, setAssignedvalue] = useState([]);


  const Assigneddisplay = async () => {
    const username = localStorage.getItem("username");
    const data = await apiService.getAssignments(username);
    setAssignedvalue(data);
  };

  useEffect(() => {
    Assigneddisplay();
  }, []);





const heading= ["BugId", "AssignedTo","Sprint", "EstimateDate", "CreatedDate", "Status" ,"MoreInfo"]
  return (
    <>
      <BasicTable rows={assignedValue} heading={heading} Assigneddisplay={Assigneddisplay()}/>
    </>
  );
};

export default Assigned;

