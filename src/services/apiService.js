const baseUrl = "http://localhost:3001/api";

const createUser = async (userObj) => {
  const response = await fetch(`${baseUrl}/users/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const parsedJSON = await response.json();
  return parsedJSON;
};

const login = async (userObj) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const parsedResponse = await response.json();

  return parsedResponse;
};

const isAuth = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/login/auth`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const isAuth = !(response.status === 401);
  return isAuth;
};

const logout = () => {
  localStorage.clear();
};

const getProjects = async () => {
  
  const response = await fetch(`${baseUrl}/projects`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

const getAssignments = async (username) => {

  const response = await fetch(`${baseUrl}/issuetracker/assigned/${username}/`);
  const parsedResponse = await response.json();
  return parsedResponse;

};

const getSubmissions = async (username) => {
  const response = await fetch(`${baseUrl}/issuetracker/reported/${username}`);
  const parsedResponse = await response.json();

  return parsedResponse;
};

const createProject = async (record) => {
  const response = await fetch(`${baseUrl}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(record),
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

const deleteProject = async (id) => {
  const response = await fetch(`${baseUrl}/projects/${id}`, {
    method: "DELETE",
  });
  const parsedResponse = await response.json();
  return parsedResponse;
};

const editProject = async (record) => {
  const { description,title} = record;
  let payload = { description,title}
  const response = await fetch(`${baseUrl}/projects/${record.id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  const parsedResponse = await response.json();

  return parsedResponse;
};

const createModule = async (record) => {
  const response = await fetch(`${baseUrl}/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  const parsedResponse = await response.json();

  return parsedResponse;
};
const deleteModule = async (_id) => {
  const response = await fetch(`${baseUrl}/modules/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};
const editModuledata = async (_id, record) => {
  const response = await fetch(`${baseUrl}/modules/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

const putStatus = async (status) => {

  const response = await fetch(`${baseUrl}/issuetracker/${status._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

const getBugs = async () => {
  const response = await fetch(`${baseUrl}/issuetracker/`);
  const parsedResponse = await response.json();

  return parsedResponse;
};


const getModule = async () => {
  const response = await fetch(`${baseUrl}/modules/`);
  const parsedResponse = await response.json();

  return parsedResponse;
};

const createBugs = async (record) => {
  const response = await fetch(`${baseUrl}/issuetracker/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  const parsedResponse = await response.json();
  return parsedResponse;

};

const generateBug = async (id) => {
  const response = await fetch(`${baseUrl}/issuetracker/generateId`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};


const bugStatus = async () => {
  const response = await fetch(`${baseUrl}/issuestatus/`);
  const parsedResponse = await response.json();

  return parsedResponse;
}

const deleteUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
  });
  const parsedResponse = await response.json();
  return parsedResponse;
};

const editUser = async (_id, record) => {
  const response = await fetch(`${baseUrl}/users/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

const getBySprint = async () => {
  const response = await fetch(`${baseUrl}/issuetracker/bySprint`);
  const parsedResponse = await response.json();

  return parsedResponse;
};
const getUserSprint =async () => {
  const response = await fetch(`${baseUrl}/issuetracker/userSprint`);
  const parsedResponse = await response.json();

  return parsedResponse;
};

const adminUserData = async() => {
  const response = await fetch(`${baseUrl}/issuetracker/status`);
  const parsedResponse = await response.json();
  console.log(parsedResponse);
  return parsedResponse;
}

const apiService = {
  createUser,
  login,
  logout,
  getProjects,
  getUsers,
  isAuth,
  getAssignments,
  getSubmissions,
  createProject,
  deleteProject,
  editProject,
  createModule,
  deleteModule,
  generateBug,
  editModuledata,
  putStatus,
  getBugs,
  getModule,
  createBugs,
  bugStatus,
  deleteUser,
  editUser,
  getBySprint,
  getUserSprint,
  adminUserData
};

export default apiService;
