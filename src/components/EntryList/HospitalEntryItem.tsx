import { HospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const itemStyle = {
    border: "1px solid"
}

const HospitalEntryItem = (props: Props) => {
    const e = props.entry;
    return (
        <div style={itemStyle} key={e.id}>
            {e.date} <LocalHospitalIcon></LocalHospitalIcon> <br></br>
            {e.description} <br></br>
            Discharge date: {e.discharge.date} <br></br>
            Discharge criteria: {e.discharge.criteria} <br></br>
            <ul>
                {e.diagnosisCodes?.map(code => <li key={code}>{code} {props.diagnoses.find(d => d.code === code)?.name}</li>)}
            </ul>
        </div>
    );
};

export default HospitalEntryItem;