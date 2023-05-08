import { Patient } from "./../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "./../../services/patients";

const PatientView = () => {
    const [patient, setPatient] = useState<Patient>();
    const paramId = useParams().id;
    useEffect(() => {
        const patientId = paramId ? paramId : "asd";
        const fetchPatient = async () => {
            const p = await patientService.findById(patientId);
            setPatient(p);
        }
        void fetchPatient();
    }, [paramId]);
    
    
    
    if (!patient) return null;
    const p = patient;
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
    );
};

export default PatientView;