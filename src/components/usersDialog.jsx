import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiService from "../services/apiService";



const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });
const UsersDialog = ({load}) => {
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit:  async(values) => {
      const userObj = {
        name: values.name,
        username: values.username,
        password: values.password,
        role: values.role,
      };
        const result = await apiService.createUser(userObj);
        if (result) {
          setOpen(false);
          load()
          formik.resetForm();
        }
    },
  });
  
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create User</Button>
      <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography>Create User</Typography>
        </DialogTitle>
        <DialogContent >
         <Stack spacing={2}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              type="text"
              sx={{mt:1}}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                z
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"developer"}>Developer</MenuItem>
                
              </Select>
              {formik.touched.role &&formik.errors.role ?<FormHelperText error>{formik.errors.role}</FormHelperText>:""}
            </FormControl>
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  type="submit">Create</Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UsersDialog;
