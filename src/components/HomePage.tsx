import { useEffect, useState } from "react";
import { Grid, Button, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, viewTask } from "../slices/taskSlice";
import TaskCard from "./TaskCard";
import EditTaskDialog from "./dialogs/EditDialog";
import SearchInput from "./SearchBar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      backgroundColor: "#282c34",
      alignItems: "center",
      padding: "1rem",
    },
    titleContainer: {
      marginTop: "5rem",
      textAlign: "center",
    },
    todo: {
      color: "white",
      fontWeight: 900,
      fontSize: "3rem",
    },
    list: {
      color: "blue",
      fontWeight: 900,
      fontSize: "3rem",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      maxWidth: "45vw",
      [theme.breakpoints.down("md")]: {
        maxWidth: "80vw",
      },
    },
    cardContainer: {
      width: "45vw",
      [theme.breakpoints.down("md")]: {
        width: "80vw",
      },
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://to-do-list-server-sdnp.onrender.com/api/get-tasks"
      );
      const data = await response.json();
      dispatch(setTasks(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter((task: any) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExpand = (index: any) => {
    dispatch(viewTask({ ...tasks[index], expanded: !tasks[index].expanded }));
  };

  const handleEditClick = (task: any) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  return (
    <Grid
      container
      className={classes.body}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Grid item className={classes.titleContainer}>
        <span className={classes.todo}>
          TODO <span className={classes.list}>LIST</span>
        </span>
      </Grid>
      <SearchInput
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
      />
      <Grid item flex={1} className={classes.cardContainer}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: any, index: any) => (
            <Grid item key={task._id} sx={{ width: "100%" }}>
              <TaskCard
                task={task}
                handleExpand={handleExpand}
                handleEditClick={handleEditClick}
                index={index}
              />
            </Grid>
          ))
        ) : (
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" style={{ color: "white" }}>
              No tasks found!.
            </Typography>
          </Grid>
        )}

        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button color="primary" variant="contained">
            <Link
              to="/add-task"
              style={{ color: "white", textDecoration: "none" }}
            >
              Add Todo
            </Link>
          </Button>
        </Grid>
      </Grid>
      {selectedTask && (
        <EditTaskDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          task={selectedTask}
        />
      )}
    </Grid>
  );
};

export default HomePage;
