import { Entry, Diagnosis } from "../../types";
import EntryItem from "./EntryItem";

interface Props {
    entries: Entry[];
    diagnoses: Diagnosis[];
}

const EntryList = (props: Props) => {
    if (props.entries.length === 0) return <h1>No entries</h1>;
    return (
        <div>
            <h1>Entries</h1>
            <div>
                {props.entries.map(e => {
                    return <EntryItem key={e.id} entry={e} diagnoses={props.diagnoses}></EntryItem>
                })}
            </div>
        </div>
    )
};

export default EntryList;