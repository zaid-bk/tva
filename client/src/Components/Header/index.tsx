import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  root: {},
  logo: {
    fontSize: "3rem",
    color: "yellow"
  },
  links: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    margin: "0px 10px",
    textDecoration: "none",
    color: "white"
  }
});

export default function Header() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <div>
              <Link className={classes.link} to="/">
                <span className={classes.logo}>TVA</span>
              </Link>
            </div>

            <div className={classes.links}>
              <Link className={classes.link} to="/list">
                <Typography variant="h6">Violation List</Typography>
              </Link>
              <Link className={classes.link} to="list-by-id">
                <Typography variant="h6">License Plates</Typography>
              </Link>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
