import { ClassNames } from "@emotion/react";
import { Grid, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      width: "45vw",
      [theme.breakpoints.down("md")]: {
        width: "80vw",
      },
    },
  })
);

const SearchInput = ({ searchQuery, handleSearchInputChange }: any) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Search Tasks"
        variant="filled"
        value={searchQuery}
        onChange={handleSearchInputChange}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        className={classes.search}
      />
    </Grid>
  );
};

export default SearchInput;
