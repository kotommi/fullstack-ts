import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';

import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [hcr, setHcr] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: 2,
      diagnosisCodes
    })
  }

  return (
    <div>
      <form onSubmit={addEntry}>
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
        <TextField 
          label="Healthcheck rating"
          placeholder="0"
          fullWidth
          value={hcr}
          onChange={({target}) =>  setHcr(target.value)}
        />
        <TextField 
          label="Diagnosis codes"
          placeholder=""
          fullWidth
          value={diagnosisCodes}
          onChange={({target}) => setDiagnosisCodes(target.value.split(","))}
        />

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