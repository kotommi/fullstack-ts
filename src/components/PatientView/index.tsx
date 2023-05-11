import { Diagnosis, EntryFormValues, Patient } from "./../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "./../../services/patients";
import diagnosesService from "./../../services/diagnoses"
import EntryList from "../EntryList";
import PatientDetails from "./PatientDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";

const PatientView = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState("");
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const submitNewEntry = (entry: EntryFormValues) => {
        console.log(entry);
    }

    const paramId = useParams().id;
    useEffect(() => {
        const fetchDiag = async () => {
            const diags = await diagnosesService.getAll();
            setDiagnoses(diags);
        }
        void fetchDiag();
    }, [])
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
            <PatientDetails patient={patient} />
            <EntryList entries={p.entries} diagnoses={diagnoses}></EntryList>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}></AddEntryModal>
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default PatientView;