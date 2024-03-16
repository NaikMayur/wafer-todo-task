import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Theme, Typography } from "@mui/material";
import axios from "axios";
import { createStyles, makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      backgroundColor: "#282c34",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

interface FormData {
  title: string;
  description: string;
}

const AddTaskPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    try {
      const taskData = { ...formData, status: "Pending" };
      //fire req to create task
      const response = await axios.post(
        "https://to-do-list-server-sdnp.onrender.com/api/tasks",
        taskData
      );
      console.log("Task created successfully:", response.data);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Task could not be created!");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      className={classes.body}
      sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}
    >
      <Grid item>
        <Typography variant="h4" sx={{ color: "white" }}>
          Add New Task
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <form>
          <TextField
            {...register("title", { required: "Title is required" })}
            label="Title"
            variant="filled"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message as string}
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            {...register("description", {
              required: "Description is required",
            })}
            label="Description"
            variant="filled"
            fullWidth
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message as string}
            sx={{ backgroundColor: "white" }}
          />
        </form>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            sx={{ color: "white" }}
          >
            Add Task
          </Button>
        </Grid>
        <Grid item justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button color="primary" variant="contained">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Go Back
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddTaskPage;
