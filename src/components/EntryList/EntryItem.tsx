import { Diagnosis, Entry } from "../../types";
import HealthCheckEntryItem from "./HealthCheckEntryItem";
import HospitalEntryItem from "./HospitalEntryItem";
import OccupationalEntryItem from "./OccupationalEntryItem";

interface EntryItemProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryItem = (props: EntryItemProps) => {
    const e = props.entry;
    switch (e.type) {
        case "HealthCheck":
            return <HealthCheckEntryItem entry={e} diagnoses={props.diagnoses}></HealthCheckEntryItem>
        case "Hospital":
            return <HospitalEntryItem entry={e} diagnoses={props.diagnoses}></HospitalEntryItem>
        case "OccupationalHealthcare":
            return <OccupationalEntryItem entry={e} diagnoses={props.diagnoses}></OccupationalEntryItem>
        default:
            assertNever(e);
            return <div></div>

    }
};

export default EntryItem;