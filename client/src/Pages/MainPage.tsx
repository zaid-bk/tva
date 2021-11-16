import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Layout from "../Components/Layout/Layout";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { useMutation } from "react-query";
import { client } from "../Utils/Client";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      margin: "auto"
    },
    container : {
      backgroundColor: "rgba(275,275,196,0.8)",
      // borderRadius: "50px",
      width: "100%", 
      padding: "2% 0 3% 0",
      margin: "4% 0"
    },
    mainTextWrapper: {
      margin: "0px",
      fontSize: "50px",
      paddingBottom: '1rem',
      textAlign: "center",
    },
    inputWrapper: {
      display: "flex",
      justifyContent: "center",
      "&>div": {
        margin: "0px 8px"
      }
    },
    addButtonDiv: {
      display: "flex",
      alignItems: "center"
    }
  })
);

type FormValues = {
  license: string;
  address: string;
  violation: string | null;
};

const violations = [
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

export const MainPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const intialValues = { license: "", address: "", violation: "" };
  const [formValues, setFormValues] = React.useState<FormValues>(intialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState: FormValues) => ({ ...prevState, [name]: value }));
  };

  const handleAdd = useMutation(
    (newViolation: { violation: FormValues }) => client.post("violations", newViolation),
    {
      onSuccess: () => {
        history.push("/list");
      }
    }
  );

  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <p className={classes.mainTextWrapper}>Welcome To Traffic Violation App</p>
          <div className={classes.inputWrapper}>
            <div>
              <TextField
                id="license"
                name="license"
                value={formValues.license}
                onChange={handleChange}
                label="License Plate#"
                placeholder="ABC-1234"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="address"
                name="address"
                value={formValues.address}
                onChange={e => handleChange(e)}
                label="Address"
                placeholder="House No. 123, St#1, Area"
                variant="outlined"
              />
            </div>
            <div>
              <Autocomplete
                options={violations}
                getOptionLabel={option => option}
                value={formValues.violation}
                style={{ width: 470 }}
                onChange={(e, value) =>
                  setFormValues({ ...formValues, violation: value })
                }
                renderInput={params => (
                  <TextField label="Violation" {...params} variant="outlined" />
                )}
              />
            </div>
            <div className={classes.addButtonDiv}>
              <IconButton onClick={() => handleAdd.mutate({ violation: formValues })}>
                <SendIcon style={{width: "35px", height: '35px'}} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
