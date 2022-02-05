import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useLanguage } from "../hooks/useLanguage";
import { CraftConfiguration, CraftParameter, ItemParameter, PlayerParameter } from "../models/gamestate";
import { translationProvider } from "../translation";

const levelTable = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": 11,
    "12": 12,
    "13": 13,
    "14": 14,
    "15": 15,
    "16": 16,
    "17": 17,
    "18": 18,
    "19": 19,
    "20": 20,
    "21": 21,
    "22": 22,
    "23": 23,
    "24": 24,
    "25": 25,
    "26": 26,
    "27": 27,
    "28": 28,
    "29": 29,
    "30": 30,
    "31": 31,
    "32": 32,
    "33": 33,
    "34": 34,
    "35": 35,
    "36": 36,
    "37": 37,
    "38": 38,
    "39": 39,
    "40": 40,
    "41": 41,
    "42": 42,
    "43": 43,
    "44": 44,
    "45": 45,
    "46": 46,
    "47": 47,
    "48": 48,
    "49": 49,
    "50": 50,
    "50★": 55,
    "50★★": 70,
    "50★★★": 90,
    "50★★★★": 110,
    "51": 120,
    "52": 125,
    "53": 130,
    "54": 133,
    "55": 136,
    "56": 139,
    "57": 142,
    "58": 145,
    "59": 148,
    "60": 150,
    "60★": 160,
    "60★★": 180,
    "60★★★": 210,
    "60★★★★": 250,
    "61": 260,
    "62": 265,
    "63": 270,
    "64": 273,
    "65": 276,
    "66": 279,
    "67": 282,
    "68": 285,
    "69": 288,
    "70": 290,
    "70★": 300,
    "70★★": 320,
    "70★★★": 350,
    "70★★★★": 380,
    "71": 390,
    "72": 395,
    "73": 400,
    "74": 403,
    "75": 406,
    "76": 409,
    "77": 412,
    "78": 415,
    "79": 418,
    "80": 430,
    "80★": 440,
    "80★★": 450,
    "80★★★ (480)": 480,
    "80★★★ (490)": 490,
    "80★★★★ (511)": 511,
    "80★★★★ (512)": 512,
    "80★★★★ (513)": 513,
    "80★★★★ (514)": 514,
    "80★★★★ (515)": 515,
    "80★★★★★": 516,
    "81": 517,
    "82": 520,
    "83": 525,
    "84": 530,
    "85": 535,
    "86": 540,
    "87": 545,
    "88": 550,
    "89": 555,
    "90": 560,
    "90★": 570,
    "90★★": 580,
}

interface Props {
    initialValue: CraftConfiguration
    onChange: (CraftConfiguration) => void;
}

export function ParameterEditor(props: Props) {
    const {initialValue, onChange} = props;
    const [language, setLanguage] = useLanguage();
    const [crafterLevel, setCrafterLevel] = useState<string>(initialValue.params.player.job_level.toString());
    const [craftsmanship, setCraftsmanship] = useState<string>(initialValue.params.player.craftsmanship.toString());
    const [control, setControl] = useState<string>(initialValue.params.player.control.toString());
    const [maxCP, setMaxCP] = useState<string>(initialValue.params.player.max_cp.toString());
    const [recipeLevel, setRecipeLevel] = useState<number>(initialValue.params.item.recipe_level);
    const [maxDurability, setMaxDurability] = useState<string>(initialValue.params.item.max_durability.toString());
    const [maxProgress, setMaxProgress] = useState<string>(initialValue.params.item.max_progress.toString());
    const [maxQuality, setMaxQuality] = useState<string>(initialValue.params.item.max_quality.toString());
    const [initialQuality, setInitialQuality] = useState<string>(initialValue.initialQuality.toString());    
    const t = translationProvider(language); 

    const currentValue: CraftConfiguration = {
        params: {
            player: {
                job_level: parseInt(crafterLevel),
                craftsmanship: parseInt(craftsmanship),
                control: parseInt(control),
                max_cp: parseInt(maxCP),
            },
            item: {
                recipe_level: recipeLevel,
                max_durability: parseInt(maxDurability),
                max_progress: parseInt(maxProgress),
                max_quality: parseInt(maxQuality),
            },
        },
        initialQuality: parseInt(initialQuality)
    }

    function onConfigChange(updates: Partial<CraftConfiguration>) {
        onChange({...currentValue, ...updates});
    }
    function onCraftParameterChange(updates: Partial<CraftParameter>) {
        onConfigChange({params: {...currentValue.params, ...updates}});
    }
    function onItemParameterChange(updates: Partial<ItemParameter>) {
        onCraftParameterChange({item: {...currentValue.params.item, ...updates}});
    }
    function onPlayerParameterChange(updates: Partial<PlayerParameter>) {
        onCraftParameterChange({player: {...currentValue.params.player, ...updates}});
    }
    function parseIntThen(input: string, callback: (parsedInt: number) => any) {
        const parsedNumber = parseInt(input);
        if (Number.isInteger(parsedNumber)) {
            callback(parsedNumber);
        }
    }
    const recipeLevels = Object.keys(levelTable);
    recipeLevels.sort((a, b) => levelTable[a] - levelTable[b]);

    return <Form>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>{t("ClassLevel")}</Form.Label>
                <Form.Control value={crafterLevel} onChange={(e) => {setCrafterLevel(e.target.value); parseIntThen(e.target.value, (num) => onPlayerParameterChange({job_level: num}))}}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("Craftsmanship")}</Form.Label>
                <Form.Control value={craftsmanship} onChange={(e) => {setCraftsmanship(e.target.value); parseIntThen(e.target.value, (num) => onPlayerParameterChange({craftsmanship: num}))}}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("Control")}</Form.Label>
                <Form.Control value={control} onChange={(e) => {setControl(e.target.value); parseIntThen(e.target.value, (num) => onPlayerParameterChange({control: num}))}}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxCP")}</Form.Label>
                <Form.Control value={maxCP} onChange={(e) => {setMaxCP(e.target.value); parseIntThen(e.target.value, (num) => onPlayerParameterChange({max_cp: num}))}}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>{t("RecipeLevel")}</Form.Label>
                <Form.Control as={"select"} onChange={(e) => {const num = parseInt(e.target.value); setRecipeLevel(num); onItemParameterChange({recipe_level: num})}}>
                    {recipeLevels.map((rLevel) => {
                        return <option key={rLevel} value={levelTable[rLevel]} selected={levelTable[rLevel] === recipeLevel}>{rLevel}</option>
                    })}
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxDurability")}</Form.Label>
                <Form.Control value={maxDurability} onChange={(e) => {setMaxDurability(e.target.value); parseIntThen(e.target.value, (num) => onItemParameterChange({max_durability: num}))}}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxProgress")}</Form.Label>
                <Form.Control value={maxProgress} onChange={(e) => {setMaxProgress(e.target.value); parseIntThen(e.target.value, (num) => onItemParameterChange({max_progress: num}))}}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxQuality")}</Form.Label>
                <Form.Control value={maxQuality} onChange={(e) => {setMaxQuality(e.target.value); parseIntThen(e.target.value, (num) => onItemParameterChange({max_quality: num}))}}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("InitialQuality")}</Form.Label>
                <Form.Control value={initialQuality} onChange={(e) => {setInitialQuality(e.target.value); parseIntThen(e.target.value, (num) => onConfigChange({initialQuality: num}))}}/>
            </Form.Group>
        </Row>
    </Form>
}