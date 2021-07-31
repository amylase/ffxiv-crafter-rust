import React from "react";
import { Button, Table } from "react-bootstrap";
import { useLanguage } from "../hooks/useLanguage";
import { CraftState, StatusCondition, statusConditions } from "../models/gamestate";
import { translationProvider } from "../translation";

interface Props {
    options: CraftState[];
    onChange: (CraftState) => void;
}

function stateHash(state: CraftState): number {
    return state.progress + state.quality + state.inner_quiet;
}

function stateKey(hash: number, condition: StatusCondition): string {
    return `${hash}-${condition}`;
}

export function NextStateSelector(props: Props) {
    const { options, onChange } = props;
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language);

    const hashes = Array.from(new Set(options.map(stateHash)));
    hashes.sort();
    hashes.reverse();
    const possibleConditions = statusConditions.filter((condition) => options.some((nextState) => nextState.condition === condition));

    const buttons = new Map();
    for (const statusCondition of possibleConditions) {
        for (const hash of hashes) {
            for (const nextState of options) {
                if (stateHash(nextState) === hash && nextState.condition === statusCondition) {
                    buttons.set(stateKey(stateHash(nextState), nextState.condition), <Button onClick={() => onChange(nextState)}>{" "}</Button>);
                }
            }
        }
    }

    const headers = hashes.map((hash, idx) => {
        if (idx === 0) {
            return t("Success")
        } else if (idx === 1) {
            return t("Failure")
        } else {
            return `? ${idx - 1}`
        }
    });
    
    return <Table>
        <thead>
            <tr>
                <th>#</th>
                {possibleConditions.map((condition) => <th key={condition}>{t(condition)}</th>)}
            </tr>
        </thead>
        <tbody>
            {hashes.map((hash, idx) => {
                const header = headers[idx];
                return <tr key={idx}>
                    <td>{header}</td>
                    {possibleConditions.map((condition) => {
                        return <td key={stateKey(hash, condition)}>{buttons.get(stateKey(hash, condition))}</td>;
                    })}
                </tr>
            })}
        </tbody>
    </Table>;
}