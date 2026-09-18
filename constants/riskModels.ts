export type RiskModel = {
  features: string[];
  intercept: number;
  coefficients: number[];
  means: number[];
  scales: number[];
  trainMetrics: {
    rows: number;
    accuracy: number;
    logLoss: number;
  };
  testMetrics: {
    rows: number;
    accuracy: number;
    logLoss: number;
  };
  source: string;
};

const sigmoid = (value: number) => 1 / (1 + Math.exp(-Math.max(-35, Math.min(35, value))));

export const predictRiskPercent = (model: RiskModel, values: number[]) => {
  const linear = values.reduce((sum, value, index) => {
    const standardized = (value - model.means[index]) / model.scales[index];
    return sum + standardized * model.coefficients[index];
  }, model.intercept);

  return Math.round(sigmoid(linear) * 100);
};

export const diabetesRiskModel: RiskModel = {
  "features": [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age"
  ],
  "intercept": -0.90685942,
  "coefficients": [
    0.36717457,
    0.90125927,
    -0.23267679,
    -0.0512116,
    -0.07262428,
    0.61741563,
    0.2816301,
    0.18679403
  ],
  "means": [
    3.8762215,
    119.83550489,
    69.06188925,
    20.18241042,
    74.00325733,
    31.94674267,
    0.46058958,
    33.44462541
  ],
  "scales": [
    3.37325002,
    31.93005349,
    19.9259888,
    15.7520264,
    111.12066096,
    7.88737585,
    0.32619294,
    11.84148956
  ],
  "trainMetrics": {
    "rows": 614,
    "accuracy": 0.7736,
    "logLoss": 0.4809
  },
  "testMetrics": {
    "rows": 154,
    "accuracy": 0.7792,
    "logLoss": 0.4493
  },
  "source": "Pima Indians Diabetes dataset, 768 rows, stored in data/diabetes.csv"
};

export const heartRiskModel: RiskModel = {
  "features": [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "thalach",
    "exang"
  ],
  "intercept": -0.13524787,
  "coefficients": [
    0.32536651,
    0.79895919,
    0.68065182,
    0.30587042,
    0.3107557,
    0.01692292,
    -0.74194248,
    0.44078219
  ],
  "means": [
    54.12658228,
    0.70464135,
    3.16877637,
    131.75105485,
    244.58649789,
    0.14767932,
    149.33333333,
    0.31223629
  ],
  "scales": [
    8.96458163,
    0.45620381,
    0.99205482,
    16.63942655,
    46.53982809,
    0.35478182,
    23.3861969,
    0.46340564
  ],
  "trainMetrics": {
    "rows": 237,
    "accuracy": 0.7764,
    "logLoss": 0.4475
  },
  "testMetrics": {
    "rows": 60,
    "accuracy": 0.8167,
    "logLoss": 0.4866
  },
  "source": "UCI Cleveland Heart Disease dataset, 297 usable rows after removing missing values, stored in data/processed.cleveland.data"
};
