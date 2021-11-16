import * as React from "react";
import { createStyles, Theme, makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../Components/Layout/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "react-query";
import { client } from "../Utils/Client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "98%",
      margin: "2rem auto"
    },
    mainTextWrapper: {
      margin: "1rem 0px",
      fontSize: "8rem",
      textAlign: "center"
    },
    inputWrapper: {
      display: "flex",
      justifyContent: "center",
      "&>div": {
        margin: "0px 8px"
      }
    },
    table: {
      minWidth: 700
    }
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14,
      textTransform: "uppercase"
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);

type Violation = {
  license: string;
  address: string;
  violation: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  count?: number;
  id: number;
};

export const ListPageById = () => {
  const classes = useStyles();

  const { isLoading, data: violations } = useQuery<Violation[]>("violations", () =>
    client.get("violations").then(res => res.data.violations)
  );

  const filterData = violations;
  const newData = filterData && filterData.filter(v => v.deleted === false);

  const result = newData?.map((vehicle: Violation) => {
    const newString = vehicle.license.split(",").toString();
    return newString;
  });
  const counts = {} as any;
  const countResult = result?.forEach(x => {
    counts[x] = (counts[x] || 0) + 1;
  });

  if (isLoading) {
    return null;
  }

  if (violations) {
    return (
      <Layout>
        <div className={classes.wrapper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="violation table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>License-Plate#</StyledTableCell>
                  <StyledTableCell align="center">Violation Counts</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(counts).map(key => {
                  return (
                    <StyledTableRow key={key}>
                      <StyledTableCell component="th" scope="row">
                        {key}
                      </StyledTableCell>
                      <StyledTableCell align="center">{counts[key]}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Layout>
    );
  }
  return null;
};
