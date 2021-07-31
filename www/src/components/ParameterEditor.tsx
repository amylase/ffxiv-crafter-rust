import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useLanguage } from "../hooks/useLanguage";
import { CraftConfiguration, CraftParameter, ItemParameter, PlayerParameter, suggestedControls, suggestedCraftsmanships } from "../models/gamestate";
import { translationProvider } from "../translation";

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
                <Form.Control value={config.params.item.internal_level} onChange={(e) => onItemParameterChange({...config.params.item, internal_level: parseInt(e.target.value)})}/>
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