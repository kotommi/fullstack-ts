import { Patient } from "../../types";

interface Props {
    patient: Patient;
}

const PatientDetails = (props: Props) => {
    const p = props.patient;
    return (
        <div>
            <h1>{p.name}</h1>
            <p>
                ssn: {p.ssn} <br></br>
                occupation: {p.occupation} <br></br>
                Date of Birth: {p.dateOfBirth} <br></br>
                Gender: {p.gender} <br></br>
                Id: {p.id} <br></br>
            </p>
        </div>
    )
};

export default PatientDetails;