import { Grid, TextField } from "@mui/material";

const SearchInput = ({ searchQuery, handleSearchInputChange }: any) => {
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
        }}
      />
    </Grid>
  );
};

export default SearchInput;
