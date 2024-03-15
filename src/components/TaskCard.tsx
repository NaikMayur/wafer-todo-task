import { Card, CardContent, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";
import TaskDetails from "./TaskDetails";
import theme from "../styles/theme";

const useStyles = makeStyles({
  card: {
    maxWidth: "45vw",
    [theme.breakpoints.down("md")]: {
      maxWidth: "80vw",
    },
  },
  column: {
    textAlign: "center",
  },
  cardTitle: {
    fontWeight: 800,
    fontSize: "1.5rem",
  },
});

const TaskCard = ({ task, handleExpand, handleEditClick, index }: any) => {
  const classes = useStyles();

  return (
    <Card
      className={`${classes.card}`}
      sx={{ borderRadius: "15px", marginTop: "1rem" }}
    >
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* if status is set is set to done then display green tick mark else default */}
            <CheckCircleIcon
              sx={{
                color: task.status === "Done" ? "green" : "",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span className={classes.cardTitle}>{task.title}</span>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            className={classes.column}
          >
            <Button onClick={() => handleExpand(index)}>View</Button>
            <Button onClick={() => handleEditClick(task)}>Edit</Button>
          </Grid>
        </Grid>
        <TaskDetails task={task} />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
