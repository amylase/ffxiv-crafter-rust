import json
import os
import subprocess

import optuna


def create_objective():
    with open("python/base_case.json", encoding="utf-8") as f:
        base_params = json.load(f)
    os.makedirs("python/buf", exist_ok=True)
    # {"craft_params": {"player": {"job_level": 90, "craftsmanship": 3750, "control": 3344, "max_cp": 633, "unavailable_actions": []}, "item": {"recipe_level": 610, "max_durability": 70, "max_progress": 5060, "max_quality": 12628}}, "annealing_params": {"start_temperature": 0.0010658504219255337, "end_temperature": 0.027239596058714243, "steps": 1000000, "max_quality_scaling": 0.9731422590775488, "add_proba": 0.015093643800598593, "remove_proba": 0.07721372283039679, "swap_proba": 0.3743354308137201}}
    
    def _objective(trial: optuna.Trial):
        trial_id = trial.number
        end_temperature = trial.suggest_float("end_temperature", 10 ** -8, 10 ** -1, log=True)
        start_temperature = trial.suggest_float("start_temperature", end_temperature, 10 ** 0, log=True)
        max_quality_scaling = trial.suggest_float("max_quality_scaling", 1.0, 1.5)
        add_proba = trial.suggest_float("add_proba", 0.0, 1.0)
        remove_proba = trial.suggest_float("remove_proba", 0.0, 1.0 - add_proba)
        swap_proba = trial.suggest_float("swap_proba", 0.0, 1.0 - add_proba - remove_proba)
        params = {}
        params.update(base_params)
        params["annealing_params"] = {
            "start_temperature": start_temperature,
            "end_temperature": end_temperature,
            "steps": 1_000_000,
            "max_quality_scaling": max_quality_scaling,
            "add_proba": add_proba,
            "remove_proba": remove_proba,
            "swap_proba": swap_proba,
        }
        params_path = f"python/buf/in_{trial_id:05}.json"
        metrics_path = f"python/buf/out_{trial_id:05}.json"
        with open(params_path, "w", encoding="utf-8") as f:
            json.dump(params, f)
        subprocess.check_call(["cargo", "run", "-r", "--bin", "gen_macro", params_path, metrics_path])
        with open(metrics_path, encoding="utf-8") as f:
            metrics = json.load(f)
        return metrics["metrics"]["annealing_objective"]
    return _objective


if __name__ == '__main__':
    objective = create_objective()
    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=1000, n_jobs=-1)
    best_params = study.best_params
    print(best_params)