import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import UserDialog from "../components/usersDialog";
import UserCard from "../components/UserCard";

const Users = () => {
  const [userData, setUserData] = useState({});
  const [correct, setCorrect] = useState(false);

  const handleUsers = async () => {
    const result = await apiService.getUsers();
    setUserData(result);
  };

  useEffect(() => {
    handleUsers();
  }, [correct]);
  return (
    <>
      <UserDialog load={handleUsers} />
      
      {userData.length
        ? userData.map((userData) => (
            <UserCard
              userData={userData}
              setCorrect={setCorrect}
              load={handleUsers}
            />
          ))
        : "No Projects Found"}
    </>
  );
};

export default Users;
