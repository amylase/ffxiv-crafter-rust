import optuna
import optuna.visualization


def main():
    study = optuna.load_study(study_name='crafter_annealing', storage='sqlite:///optuna.db')
    print(study.best_params, study.best_value)
    optuna.visualization.plot_param_importances(study).show()
    optuna.visualization.plot_slice(study).show()


if __name__ == '__main__':
    main()