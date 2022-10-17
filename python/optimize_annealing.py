import json
import os
import subprocess

import optuna


def create_objective():
    with open("python/base_case.json", encoding="utf-8") as f:
        base_params = json.load(f)
    os.makedirs("python/buf", exist_ok=True)

    def _objective(trial: optuna.Trial):
        trial_id = trial.number
        end_temperature = trial.suggest_loguniform("end_temperature", 10 ** -9, 10 ** -1)
        temperature_scale = trial.suggest_loguniform("temperature_scale", 1, 1000)
        max_quality_scaling = trial.suggest_uniform("max_quality_scaling", 0.9, 1.5)
        params = {}
        params.update(base_params)
        params["annealing_params"] = {
            "start_temperature": end_temperature * temperature_scale,
            "end_temperature": end_temperature,
            "steps": 1_000_000,
            "max_quality_scaling": max_quality_scaling,
        }
        params_path = f"python/buf/in_{trial_id:05}.json"
        metrics_path = f"python/buf/out_{trial_id:05}.json"
        with open(params_path, "w", encoding="utf-8") as f:
            json.dump(params, f)
        subprocess.check_call(["cargo", "run", "-r", "--bin", "gen_macro", params_path, metrics_path])
        with open(metrics_path, encoding="utf-8") as f:
            metrics = json.load(f)
        return metrics["max_quality_rate"]
    return _objective


if __name__ == '__main__':
    objective = create_objective()
    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=100)
    best_params = study.best_params
    print(best_params)