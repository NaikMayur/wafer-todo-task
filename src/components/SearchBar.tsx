import { Grid, MenuItem, Select, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      width: "35vw",
      [theme.breakpoints.down("md")]: {
        width: "70vw",
      },
    },
    select: {
      marginLeft: "1rem",
      backgroundColor: "white",
      borderRadius: "20px",
    },
  })
);

const SearchInput = ({
  searchQuery,
  handleSearchInputChange,
  handleFilterChange,
}: any) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const handleFilter = async (event: any) => {
    const selectedValue = event.target.value as string;
    handleFilterChange(selectedValue);
  };

  return (
    <Grid
      container
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
      <Select
        defaultValue="All"
        className={classes.select}
        {...register("status")}
        sx={{ color: "black" }}
        onChange={handleFilter}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </Select>
    </Grid>
  );
};

export default SearchInput;
