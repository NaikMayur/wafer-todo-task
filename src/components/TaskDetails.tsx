import { Collapse, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  contentContainer: {
    flexDirection: "column",
  },
  contentContainerExpanded: {
    flexDirection: "row",
  },
  description: {
    whiteSpace: "pre-wrap",
  },
});

const TaskDetails = ({ task }: any) => {
  const classes = useStyles();

  return (
    <Collapse in={task.expanded} timeout="auto" unmountOnExit>
      <Grid
        container
        spacing={2}
        className={
          task.expanded
            ? classes.contentContainerExpanded
            : classes.contentContainer
        }
      >
        <Grid item xs={12} justifyContent="center" sx={{ display: "flex" }}>
          <Typography
            variant="body1"
            className={classes.description}
            noWrap={!task.expanded}
          >
            {task.description}
          </Typography>
        </Grid>
      </Grid>
    </Collapse>
  );
};

export default TaskDetails;
