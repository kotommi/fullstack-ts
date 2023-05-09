import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}

const itemStyle = {
    border: "1px solid"
}

const OccupationalEntryItem = (props: Props) => {
    const e = props.entry;
    return (
        <div style={itemStyle}>
            {e.date} <WorkIcon></WorkIcon> <br></br>
            {e.description} <br></br>
            {e.sickLeave? `Sick leave: ${e.sickLeave.startDate} - ${e.sickLeave.endDate}` : null}
            <ul>
                {e.diagnosisCodes?.map(code => <li key={code}>{code} {props.diagnoses.find(d => d.code === code)?.name}</li>)}
            </ul>
        </div>
    )
};

export default OccupationalEntryItem;