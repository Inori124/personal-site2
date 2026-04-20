import type { Metadata } from 'next';
import Image from 'next/image';

import PageWrapper from '@/components/Template/PageWrapper';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Internet Finance Risk Control',
  description:
    'An end-to-end Home Credit default-risk project with data governance, modeling, and explainability.',
  path: '/projects/internet-finance-risk-control/',
});

export default function InternetFinanceRiskControlPage() {
  return (
    <PageWrapper>
      <article className="post-page">
        <header className="post-header">
          <time className="post-date" dateTime="2026-02-01">
            February 2026
          </time>
          <h1 className="post-title">Internet Finance Risk Control</h1>
          <p className="post-description">
            Integrated from my Home Credit notebooks and report into a complete
            web-ready project page.
          </p>
        </header>

        <div className="post-content prose project-case-study">
          <h2>Dataset Structure and Table Relationships</h2>
          <p>
            Based on the Home Credit Default Risk competition data schema
            (Kaggle), the project is built on one main application table plus
            multiple behavioral history tables linked by customer and loan keys.
          </p>
          <h3>Core Tables</h3>
          <ul>
            <li>
              <strong>Main table:</strong> <code>application_train</code> /{' '}
              <code>application_test</code> (one row per current loan
              application, key: <code>SK_ID_CURR</code>
              ).
            </li>
            <li>
              <strong>External credit bureau:</strong> <code>bureau</code> (key:{' '}
              <code>SK_ID_CURR</code>, <code>SK_ID_BUREAU</code>) and{' '}
              <code>bureau_balance</code> (monthly records by{' '}
              <code>SK_ID_BUREAU</code>
              ).
            </li>
            <li>
              <strong>Historical applications:</strong>{' '}
              <code>previous_application</code> (key: <code>SK_ID_CURR</code>,{' '}
              <code>SK_ID_PREV</code>
              ).
            </li>
            <li>
              <strong>History by previous loan:</strong>{' '}
              <code>POS_CASH_balance</code>, <code>credit_card_balance</code>,{' '}
              <code>installments_payments</code> (all keyed by{' '}
              <code>SK_ID_PREV</code>, optionally <code>SK_ID_CURR</code>
              ).
            </li>
          </ul>
          <h3>Relationship Map</h3>
          <pre>
            <code>{`application_train/test (SK_ID_CURR)
    |
    |--1:N--> bureau (SK_ID_CURR, SK_ID_BUREAU)
    |            |
    |            |--1:N--> bureau_balance (SK_ID_BUREAU)
    |
    |--1:N--> previous_application (SK_ID_CURR, SK_ID_PREV)
                 |--1:N--> POS_CASH_balance (SK_ID_PREV)
                 |--1:N--> credit_card_balance (SK_ID_PREV)
                 |--1:N--> installments_payments (SK_ID_PREV)`}</code>
          </pre>
          <h3>Join Strategy (Feature Mart Build)</h3>
          <pre>
            <code>{`# aggregate child tables to customer level, then left join to main table
bureau_agg = bureau.groupby("SK_ID_CURR").agg(["mean", "max", "min", "sum"])
prev_agg = previous_application.groupby("SK_ID_CURR").agg(["mean", "max", "min", "sum"])
inst_agg = installments_payments.groupby("SK_ID_CURR").agg(["mean", "max", "min", "sum"])
card_agg = credit_card_balance.groupby("SK_ID_CURR").agg(["mean", "max", "min", "sum"])
pos_agg = POS_CASH_balance.groupby("SK_ID_CURR").agg(["mean", "max", "min", "sum"])

train_mart = application_train \
    .merge(bureau_agg, on="SK_ID_CURR", how="left") \
    .merge(prev_agg, on="SK_ID_CURR", how="left") \
    .merge(inst_agg, on="SK_ID_CURR", how="left") \
    .merge(card_agg, on="SK_ID_CURR", how="left") \
    .merge(pos_agg, on="SK_ID_CURR", how="left")`}</code>
          </pre>

          <h2>Project Scope</h2>
          <p>
            This project follows a standard internet-finance risk-control
            pipeline: business definition, data governance, multi-table feature
            engineering, baseline and champion modeling, score-to-decision
            strategy, stability monitoring, and explainability.
          </p>
          <ul>
            <li>
              <strong>Task:</strong> Predict <code>TARGET=1</code> (default
              risk)
            </li>
            <li>
              <strong>Data:</strong> Home Credit multi-table credit data
            </li>
            <li>
              <strong>Primary goals:</strong> High AUC/KS + stable deployment +
              explainable decision rules
            </li>
          </ul>

          <h2>1) Data Governance Pipeline</h2>
          <p>
            I started from risk-specific data governance: missingness audit,
            anomaly tagging, leakage removal, and dataset consistency checks
            between train and test.
          </p>
          <h3>Processing Logic</h3>
          <ol>
            <li>
              Audit missing rates and split features by missingness bands.
            </li>
            <li>
              Detect anomaly values in <code>DAYS_EMPLOYED</code> (365243),
              create an anomaly indicator, and map anomalies to missing.
            </li>
            <li>
              Remove direct-leakage columns and enforce train/test schema
              alignment before modeling.
            </li>
          </ol>
          <h3>Core Data-Governance Code (Python)</h3>
          <pre>
            <code>{`# 1) missingness audit
missing_ratio = df.isna().mean().sort_values(ascending=False)
high_missing = missing_ratio[missing_ratio > 0.8].index.tolist()
mid_missing = missing_ratio[(missing_ratio > 0.3) & (missing_ratio <= 0.8)].index.tolist()

# 2) anomaly handling
df["DAYS_EMPLOYED_ANOM"] = (df["DAYS_EMPLOYED"] == 365243).astype(int)
df.loc[df["DAYS_EMPLOYED"] == 365243, "DAYS_EMPLOYED"] = np.nan

# 3) leakage and consistency guard
drop_cols = ["SK_ID_CURR", "TARGET", "DAYS_DECISION"]  # example leakage/id cols
feature_cols = [c for c in df.columns if c not in drop_cols]
feature_cols = [c for c in feature_cols if c not in high_missing]

# 4) basic derived feature
df["AGE_YEARS"] = (-df["DAYS_BIRTH"] / 365.25).round(1)`}</code>
          </pre>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/target_distribution.png"
                alt="Target distribution for default and non-default samples"
                width={1200}
                height={800}
              />
              <figcaption>Target imbalance (default rate 8.07%).</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/missing_top15.png"
                alt="Top missing-rate features"
                width={1200}
                height={800}
              />
              <figcaption>Top-15 feature missingness profile.</figcaption>
            </figure>
          </div>

          <h2>2) Feature Risk Patterns (EDA)</h2>
          <p>
            EDA focused on risk signal verification and monotonicity checks. The
            analysis confirmed that lower external bureau scores are associated
            with higher default rates.
          </p>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/age_by_target.png"
                alt="Age distribution by default label"
                width={1200}
                height={800}
              />
              <figcaption>
                Age distribution contrast by default label.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/ext_source2_decile_risk.png"
                alt="Default rate by EXT_SOURCE_2 deciles"
                width={1200}
                height={800}
              />
              <figcaption>
                Default risk gradient across EXT_SOURCE_2 deciles.
              </figcaption>
            </figure>
          </div>
          <h3>Core Feature Engineering Code (Python)</h3>
          <pre>
            <code>{`# Multi-table aggregation (application + bureau + previous)
def agg_numeric(df, group_key, prefix):
    num_cols = df.select_dtypes(include=["number"]).columns.tolist()
    num_cols = [c for c in num_cols if c != group_key]
    agg_df = df.groupby(group_key)[num_cols].agg(["mean", "max", "min", "sum"])
    agg_df.columns = [f"{prefix}_{c}_{s}" for c, s in agg_df.columns]
    return agg_df.reset_index()

bureau_agg = agg_numeric(bureau, "SK_ID_CURR", "bureau")
prev_agg = agg_numeric(previous_application, "SK_ID_CURR", "prev")

train_merged = app_train.merge(bureau_agg, on="SK_ID_CURR", how="left")
train_merged = train_merged.merge(prev_agg, on="SK_ID_CURR", how="left")

# ratio features
train_merged["credit_income_ratio"] = train_merged["AMT_CREDIT"] / (
    train_merged["AMT_INCOME_TOTAL"] + 1e-6
)
train_merged["annuity_income_ratio"] = train_merged["AMT_ANNUITY"] / (
    train_merged["AMT_INCOME_TOTAL"] + 1e-6
)`}</code>
          </pre>

          <h2>3) Modeling and Evaluation</h2>
          <p>
            The modeling stage follows a standard credit-risk path:
            Logistic-Regression baseline for interpretability and LightGBM
            champion model for ranking power, with cross-validation and
            out-of-fold predictions.
          </p>
          <h3>Machine-Learning Logic</h3>
          <ol>
            <li>
              Build baseline LR with imputation + scaling + class balancing.
            </li>
            <li>
              Train LightGBM with stratified 5-fold CV and out-of-fold scoring.
            </li>
            <li>
              Compare models by AUC/KS/PSI, then choose champion model for
              decision strategy.
            </li>
          </ol>
          <h3>Core Modeling Code (Python: LR Baseline)</h3>
          <pre>
            <code>{`from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X_tr, X_va, y_tr, y_va = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

lr_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(
        C=0.05,
        class_weight="balanced",
        max_iter=1000,
        random_state=42,
    )),
])
lr_pipe.fit(X_tr, y_tr)
lr_prob = lr_pipe.predict_proba(X_va)[:, 1]`}</code>
          </pre>
          <h3>Core Modeling Code (Python: LightGBM 5-Fold CV)</h3>
          <pre>
            <code>{`import lightgbm as lgb
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import roc_auc_score

lgb_params = {
    "objective": "binary",
    "metric": ["auc"],
    "learning_rate": 0.05,
    "num_leaves": 31,
    "min_child_samples": 30,
    "feature_fraction": 0.8,
    "bagging_fraction": 0.8,
    "bagging_freq": 5,
    "scale_pos_weight": (y == 0).sum() / (y == 1).sum(),
    "verbose": -1,
    "random_state": 42,
}

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
oof_preds = np.zeros(len(X))

for tr_idx, va_idx in skf.split(X, y):
    X_tr_f, X_va_f = X.iloc[tr_idx], X.iloc[va_idx]
    y_tr_f, y_va_f = y.iloc[tr_idx], y.iloc[va_idx]
    train_data = lgb.Dataset(X_tr_f, label=y_tr_f)
    val_data = lgb.Dataset(X_va_f, label=y_va_f, reference=train_data)

    model = lgb.train(
        lgb_params,
        train_data,
        num_boost_round=2000,
        valid_sets=[val_data],
        callbacks=[lgb.early_stopping(100, verbose=False)],
    )
    oof_preds[va_idx] = model.predict(X_va_f, num_iteration=model.best_iteration)

oof_auc = roc_auc_score(y, oof_preds)`}</code>
          </pre>
          <h3>Core Evaluation Code (AUC + KS + PSI)</h3>
          <pre>
            <code>{`from sklearn.metrics import roc_curve

def calc_ks(y_true, y_prob):
    fpr, tpr, _ = roc_curve(y_true, y_prob)
    return float(np.max(tpr - fpr))

def calc_psi(train_prob, val_prob, bins=10):
    _, edges = np.histogram(train_prob, bins=bins)
    edges[0] -= 1e-9
    edges[-1] += 1e-9
    p_train, _ = np.histogram(train_prob, bins=edges)
    p_val, _ = np.histogram(val_prob, bins=edges)
    p_train = np.where(p_train == 0, 1e-10, p_train / p_train.sum())
    p_val = np.where(p_val == 0, 1e-10, p_val / p_val.sum())
    return float(np.sum((p_val - p_train) * np.log(p_val / p_train)))

ks = calc_ks(y, oof_preds)
# Example split for stability check
psi = calc_psi(oof_preds[: len(oof_preds)//2], oof_preds[len(oof_preds)//2:])`}</code>
          </pre>
          <ul>
            <li>
              <strong>Training sample (benchmark page):</strong> 120,000
            </li>
            <li>
              <strong>Random-Forest benchmark accuracy:</strong> 0.894
            </li>
            <li>
              <strong>Random-Forest benchmark ROC-AUC:</strong> 0.731
            </li>
          </ul>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/model_roc.png"
                alt="ROC curve for risk model"
                width={1200}
                height={800}
              />
              <figcaption>Model ROC curve.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/model_confusion_matrix.png"
                alt="Confusion matrix for risk model"
                width={1200}
                height={800}
              />
              <figcaption>
                Confusion matrix at default threshold 0.5.
              </figcaption>
            </figure>
          </div>

          <h2>4) Score Strategy and Decisioning</h2>
          <p>
            After model selection, the workflow converts probabilities into
            business actions: decile risk segmentation, approval/review/reject
            cutoffs, and monitoring-ready decision tables.
          </p>
          <h3>Core Strategy Code (Python)</h3>
          <pre>
            <code>{`score_df = pd.DataFrame({
    "target_true": y,
    "pd": oof_preds,  # predicted default probability
})

score_df["risk_decile"] = pd.qcut(score_df["pd"], 10, labels=False)
decile_stats = score_df.groupby("risk_decile").agg(
    n=("target_true", "count"),
    bad=("target_true", "sum"),
    bad_rate=("target_true", "mean"),
    avg_pd=("pd", "mean"),
).reset_index()

# policy example
def policy(pd_score):
    if pd_score < 0.08:
        return "approve"
    if pd_score < 0.16:
        return "manual_review"
    return "reject"

score_df["decision"] = score_df["pd"].apply(policy)`}</code>
          </pre>

          <h2>5) Explainability and Business Translation</h2>
          <p>
            Explainability combines global ranking and local attribution:
            feature importance + SHAP summary/dependence plots to clarify why a
            client is scored high risk.
          </p>
          <h3>Core Explainability Code (Python)</h3>
          <pre>
            <code>{`import shap

sample_idx = X.sample(n=1000, random_state=42).index
X_explain = X.loc[sample_idx]

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_explain)

shap.summary_plot(shap_values, X_explain, plot_type="bar", max_display=20)
shap.summary_plot(shap_values, X_explain, max_display=20)`}</code>
          </pre>
          <div className="project-image-grid project-image-grid--single">
            <figure>
              <Image
                src="/images/projects/internet-finance-risk/feature_importance_top15.png"
                alt="Top feature importance for risk model"
                width={1200}
                height={800}
              />
              <figcaption>
                Top-15 feature importance for risk ranking.
              </figcaption>
            </figure>
          </div>

          <h2>Final Deliverable</h2>
          <p>
            Full report:{' '}
            <a
              href="/files/internet-finance-risk-report.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Credit Default Risk Analysis Report (PDF)
            </a>
          </p>
        </div>
      </article>
    </PageWrapper>
  );
}
