import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';


interface Props {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}


const healthColor = (hcr: HealthCheckRating): string => {
    switch (hcr) {
        case HealthCheckRating.Healthy:
            return "green";
        case HealthCheckRating.LowRisk:
            return "yellow";
        case HealthCheckRating.HighRisk:
            return "red";
        case HealthCheckRating.CriticalRisk:
            return "black";
    }
};

const itemStyle = {
    border: "1px solid"
}



const HealthCheckEntryItem = (props: Props) => {
    const e = props.entry;
    return (
        <div style={itemStyle}>
            {e.date} <MedicalInformationIcon> </MedicalInformationIcon> <br></br>
            {e.description} <br></br>
            <FavoriteIcon htmlColor={healthColor(e.healthCheckRating)}></FavoriteIcon> <br></br>
            Diagnosis by {e.specialist}<br></br>
            <ul>
                {e.diagnosisCodes?.map(code => <li key={code}>{code} {props.diagnoses.find(d => d.code === code)?.name}</li>)}
            </ul>
        </div>
    );
};

export default HealthCheckEntryItem;