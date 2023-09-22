import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import UserDialog from "../components/usersDialog";
import UserCard from "../components/UserCard";
import { Grid, Typography } from "@mui/material";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [correct, setCorrect] = useState(false);

  const handleUsers = async () => {
    try {
      const result = await apiService.getUsers();
      const developerUsers = result.filter((user) => user.role === "developer");
      setUserData(developerUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    handleUsers();
  }, [correct]);

  return (
    <>
      <UserDialog load={handleUsers} />
      
      {userData.length ? (
        <Grid container spacing={4}>
          {userData.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
              <UserCard
                userData={user}
                setCorrect={setCorrect}
                load={handleUsers}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "center" }} variant="h5">
          No Developer Users Found
        </Typography>
      )}
    </>
  );
};

export default Users;
