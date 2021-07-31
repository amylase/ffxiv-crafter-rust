import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useLanguage } from "../hooks/useLanguage";
import { CraftConfiguration, CraftParameter, ItemParameter, PlayerParameter, suggestedControls, suggestedCraftsmanships } from "../models/gamestate";
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
    "80★★★": 480,
    "80★★★★": 490,
    "80★★★★★": 500,
}

interface Props {
    config: CraftConfiguration
    onChange: (CraftConfiguration) => void;
}

export function ParameterEditor(props: Props) {
    const { config, onChange } = props;
    const [ language, setLanguage ] = useLanguage();
    const t = translationProvider(language); 

    function onConfigChange(newConfig: CraftConfiguration) {
        onChange(newConfig);
    }
    function onItemParameterChange(newItemParams: ItemParameter) {
        const newParams = {
            player: config.params.player,
            item: newItemParams
        }
        onConfigChange({...config, params: newParams});
    }
    function onPlayerParameterChange(newPlayerParams: PlayerParameter) {
        const newParams = {
            player: newPlayerParams,
            item: config.params.item
        }
        onConfigChange({...config, params: newParams});
    }
    function onRecipeLevelChange(newRecipeLevel: number) {
        const newStandardCraftsmanship = suggestedCraftsmanships[newRecipeLevel];
        const newStandardControl = suggestedControls[newRecipeLevel];
        onItemParameterChange({
            ...config.params.item,
            internal_level: newRecipeLevel,
            standard_craftsmanship: newStandardCraftsmanship,
            standard_control: newStandardControl
        })
    }
    const recipeLevels = Object.keys(levelTable);
    recipeLevels.sort((a, b) => levelTable[a] - levelTable[b]);

    return <Form>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>{t("ClassLevel")}</Form.Label>
                <Form.Control value={config.params.player.raw_level} onChange={(e) => onPlayerParameterChange({...config.params.player, raw_level: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("Craftsmanship")}</Form.Label>
                <Form.Control value={config.params.player.craftsmanship} onChange={(e) => onPlayerParameterChange({...config.params.player, craftsmanship: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("Control")}</Form.Label>
                <Form.Control value={config.params.player.control} onChange={(e) => onPlayerParameterChange({...config.params.player, control: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxCP")}</Form.Label>
                <Form.Control value={config.params.player.max_cp} onChange={(e) => onPlayerParameterChange({...config.params.player, max_cp: parseInt(e.target.value)})}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>{t("RecipeLevel")}</Form.Label>
                <Form.Control as={"select"} onChange={(e) => onRecipeLevelChange(parseInt(e.target.value))}>
                    {recipeLevels.map((recipeLevel) => {
                        return <option key={recipeLevel} value={levelTable[recipeLevel]} selected={levelTable[recipeLevel] === config.params.item.internal_level}>{recipeLevel}</option>
                    })}
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxDurability")}</Form.Label>
                <Form.Control value={config.params.item.max_durability} onChange={(e) => onItemParameterChange({...config.params.item, max_durability: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxProgress")}</Form.Label>
                <Form.Control value={config.params.item.max_progress} onChange={(e) => onItemParameterChange({...config.params.item, max_progress: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("MaxQuality")}</Form.Label>
                <Form.Control value={config.params.item.max_quality} onChange={(e) => onItemParameterChange({...config.params.item, max_quality: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("InitialQuality")}</Form.Label>
                <Form.Control value={config.initialQuality} onChange={(e) => onConfigChange({...config, initialQuality: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>{t("IsExpert")}</Form.Label>
                <Form.Check checked={config.params.item.is_expert_recipe} onChange={(e) => onItemParameterChange({...config.params.item, is_expert_recipe: e.target.checked})}/>
            </Form.Group>
        </Row>
    </Form>
}