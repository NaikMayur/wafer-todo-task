import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Grid,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { viewTask, setTasks } from "../../slices/taskSlice";
import CloseIcon from "@mui/icons-material/Close";

const EditTaskDialog = ({ open, handleClose, task }: any) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (task) {
      Object.entries(task).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [task, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/update-tasks/${task._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to update task");
      }
      dispatch(viewTask(data));
      handleClose();
    } catch (error: any) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete-tasks/${task._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        throw new Error("Failed to delete task");
      }
      //get updated data
      const updatedTasksResponse = await axios.get(
        "http://localhost:4000/api/get-tasks"
      );
      dispatch(setTasks(updatedTasksResponse.data));

      handleClose();
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Grid container justifyContent="space-between">
            <Grid item>
              <span>Edit Task</span>
            </Grid>
            <Grid item>
              <CloseIcon
                onClick={handleClose}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {task && (
            <form>
              <Typography variant="body1">Task Details:</Typography>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                {...register("title")}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                {...register("description")}
              />
              <Select
                fullWidth
                label="Status"
                {...register("status")}
                defaultValue={task.status}
              >
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDelete}
            >
              Delete{" "}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EditTaskDialog;
