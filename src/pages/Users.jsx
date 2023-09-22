import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import UserDialog from "../components/usersDialog";
import UserCard from "../components/UserCard";
import { Typography } from "@mui/material";

const Users = () => {
  const [userData, setUserData] = useState({});
  const [correct, setCorrect] = useState(false);

  const handleUsers = async () => {
    const result = await apiService.getUsers();
    const uData = result.filter((data)=>{
      return data.role === "developer" 
    })
    setUserData(uData);
  };

  useEffect(() => {
    handleUsers();
  }, [correct]);

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: "1rem",
  };

  return (
    <>
      <UserDialog load={handleUsers} />
      
   
      {userData.length ? (
        <div style={gridContainerStyle}>
          {userData.map((userDatas) => (
            <UserCard
              key={userDatas._id}
              userData={userDatas}
              setCorrect={setCorrect}
              load={handleUsers}
            />
          ))}
        </div>
      ) : (
        <Typography sx={{ textAlign: "center" }} variant="h5">
          No Users Found
        </Typography>
      )}
    </>
  );
};

export default Users;
