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
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { client } from "../Utils/Client";

type Violation = {
  license: string;
  address: string;
  violation: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
};

type EditViolation = {
  license: string;
  address: string;
  violation: string;
};

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
      textTransform: "capitalize",
      "&:nth-child(1)": {
        textTransform: "uppercase"
      }
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

const violationOption = [
  "Speeding",
  "Distracted Driving",
  "Leaving the Scene of an Accident",
  "Reckless Driving",
  "Running a Red Light or Stop Sign  ",
  "Driving Without a Valid Driver's License",
  "Failing to stop or yield",
  "Failing to signal",
  "Operating vehicle without proper lighting, and seat belt",
  "Driving under the influence of alcohol or drugs (DUI)",
  "Driving while suspended or revoked",
  "Hit-and-run",
  "Vehicular homicide"
];

export const ListPage = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = React.useState<any>();
  const [toggle, setToggle] = React.useState(false);

  const { isLoading, data: violations } = useQuery<Violation[]>("violations", () =>
    client.get("violations").then(res => res.data.violations)
  );

  const EditRequest = useMutation(
    (violation: EditViolation) =>
      client.patch(`/violations/update/${isEdit.id}`, {
        violation: {
          license: isEdit.license,
          address: isEdit.address,
          violation: isEdit.violation
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("violations");
        setToggle(!toggle);
        setIsEdit(null);
      }
    }
  );

  const toggleDelete = useMutation(
    (violation: Violation) =>
      client.patch(`/violations/${violation.id}`, {
        violation: { deleted: !violation.deleted }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("violations");
      }
    }
  );

  if (isLoading) {
    return null;
  }

  if (violations) {
    const data = violations;
    const newData = data.filter(v => v.deleted === false);

    const EditItems = (index: number) => {
      const editData = newData.find(row => {
        return Number(row.id) === index;
      });
      if (editData) {
        setIsEdit(editData);
        setToggle(true);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEdit({ ...isEdit, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
      setToggle(!toggle);
      setIsEdit(null);
    };

    console.log(newData);
    return (
      <Layout>
        <div className={classes.wrapper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="violation table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>License-Plate#</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Violation</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newData
                  ?.slice(0)
                  .reverse()
                  .map(violate =>
                    toggle && isEdit.id === violate.id ? (
                      <StyledTableRow key={violate.id}>
                        <StyledTableCell component="th" scope="row">
                          <div>
                            <TextField
                              id="license"
                              name="license"
                              value={isEdit.license}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <div>
                            <TextField
                              id="address"
                              name="address"
                              value={isEdit.address}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <div>
                            <Autocomplete
                              id="violation"
                              options={violationOption}
                              value={isEdit.violation}
                              getOptionLabel={option => option}
                              onChange={(e, value) =>
                                setIsEdit({ ...isEdit, violation: value })
                              }
                              style={{ width: 470 }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Violation"
                                  variant="outlined"
                                />
                              )}
                            />
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            aria-label="update"
                            onClick={() => EditRequest.mutate(isEdit)}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton aria-label="cancel" onClick={handleCancel}>
                            <ClearIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      <StyledTableRow key={violate.id}>
                        <StyledTableCell component="th" scope="row">
                          {violate.license}
                        </StyledTableCell>
                        <StyledTableCell>{violate.address}</StyledTableCell>
                        <StyledTableCell>{violate.violation}</StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            aria-label="edit"
                            onClick={() => EditItems(Number(violate.id))}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => toggleDelete.mutate(violate)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Layout>
    );
  }
  return null;
};
