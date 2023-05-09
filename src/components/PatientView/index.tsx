import { Diagnosis, Patient } from "./../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "./../../services/patients";
import diagnosesService from "./../../services/diagnoses"

const PatientView = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const paramId = useParams().id;
    useEffect(() => {
        const fetchDiag = async () => {
            const diags = await diagnosesService.getAll();
            setDiagnoses(diags);
        }
        void fetchDiag();
    },[])
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
    console.log(p.entries);
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
            <h1>Entries</h1>
            <div>
            {p.entries.map(e => {
                return (
                    <div key={e.id}>
                        <p>{e.date} {e.description}</p>
                        <ul>
                            {e.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
                        </ul>
                    </div>
                )
            })}
            </div>
        </div>
    );
};

export default PatientView;