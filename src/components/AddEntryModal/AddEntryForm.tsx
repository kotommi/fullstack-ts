import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, InputLabel, Select, MenuItem } from '@mui/material';

import { EntryFormValues, Entry, Diagnosis } from "../../types";
import { assertNever } from "../../utils";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<Entry["type"]>("HealthCheck");

  const [hcr, setHcr] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case "HealthCheck":
        onSubmit({
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating: Number(hcr),
          diagnosisCodes
        });
        break;
      case "Hospital":
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: criteria
          }
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          },
          employerName
        });
        break;
      default: assertNever(type);
    }

  }



  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel id="demo">Type</InputLabel>
        <Select
          labelId="demo"
          value={type}
          label="Type"
          onChange={({ target }) => setType(target.value as Entry["type"])}>
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel id="diagcodes">Diagnosis codes</InputLabel>
        <Select
        multiple
        value={diagnosisCodes}
        onChange={({target}) => setDiagnosisCodes(typeof target.value === "string" ? target.value.split(",") : target.value)}>
          {diagnoses.map(d => {
            return <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>
          })}
        </Select>
        {type === "HealthCheck" ?
          <TextField
            label="HealthCheckRating"
            placeholder="0"
            fullWidth
            value={hcr}
            onChange={({ target }) => setHcr(target.value)}
          />
          : null}

        {type === "Hospital" ?
          <div>
            <TextField
              label="Dischage Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)} />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)} />
          </div>
          : null}

        {type === "OccupationalHealthcare" ?
          <div>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)} />
            <TextField
              label="Sick Leave Start Date"
              fullWidth
              placeholder="asdasd"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)} />
            <TextField
              label="Sick Leave End Date"
              fullWidth
              placeholder="asdasd"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)} />
          </div>
          : null}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;