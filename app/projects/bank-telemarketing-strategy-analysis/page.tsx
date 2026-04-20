import type { Metadata } from 'next';
import Image from 'next/image';

import PageWrapper from '@/components/Template/PageWrapper';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Bank Telemarketing Strategy Analysis',
  description:
    'An end-to-end bank telemarketing analysis project integrating exploratory analysis, modeling, and strategy recommendations.',
  path: '/projects/bank-telemarketing-strategy-analysis/',
});

export default function BankTelemarketingProjectPage() {
  return (
    <PageWrapper>
      <article className="post-page">
        <header className="post-header">
          <time className="post-date" dateTime="2026-01-30">
            January 2026
          </time>
          <h1 className="post-title">Bank Telemarketing Strategy Analysis</h1>
          <p className="post-description">
            Integrated from my R Markdown workflow and final report into a
            complete web-ready project page.
          </p>
        </header>

        <div className="post-content prose project-case-study">
          <h2>What I Built in the Rmd Workflow</h2>
          <p>
            This page focuses on the full data-processing pipeline from my R
            Markdown project: raw data import, cleaning, feature transformation,
            exploratory visualization, model training, and explainability.
          </p>

          <h2>1) Data Ingestion and Baseline Profiling</h2>
          <p>
            I loaded the UCI bank telemarketing dataset and first profiled the
            global structure by separating discrete and continuous variables.
          </p>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/discrete.png"
                alt="Distribution of discrete variables"
                width={1200}
                height={800}
              />
              <figcaption>Discrete variable composition.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/continuous.png"
                alt="Distribution of continuous variables"
                width={1200}
                height={800}
              />
              <figcaption>
                Continuous variable distribution by class.
              </figcaption>
            </figure>
          </div>

          <h2>2) Data Cleaning and Feature Engineering</h2>
          <p>
            I removed duplicates, normalized implicit missing values (such as
            <code>unknown</code> and <code>999</code> semantics), and refined
            feature encodings to align with modeling assumptions.
          </p>
          <h3>Processing Logic</h3>
          <ol>
            <li>
              Check column-wise missingness and duplicated records, then keep
              unique rows.
            </li>
            <li>
              Normalize placeholder values into proper missing values:{' '}
              <code>unknown -&gt; NA</code> and{' '}
              <code>pdays = 999 -&gt; NA</code>.
            </li>
            <li>
              Rebuild time-order features from month sequence (month number,
              year offset, campaign year).
            </li>
            <li>
              Compare imputation strategies (mean/mode, MICE-PMM, missForest) on
              simulated missingness before choosing the final pipeline.
            </li>
          </ol>
          <h3>Core R Code Blocks</h3>
          <pre>
            <code>{`# Step 1: quality check + dedup
missing_values <- colSums(is.na(df))
duplicate_rows <- sum(duplicated(df))
df_clean <- df %>% distinct()

# Step 2: normalize placeholder missing values
df_trans <- df_clean %>%
  mutate(
    across(where(is.character), \\(x) na_if(x, "unknown")),
    pdays = na_if(pdays, 999)
  )`}</code>
          </pre>
          <pre>
            <code>{`# Step 3: rebuild campaign year from month order
month_levels <- c("jan", "feb", "mar", "apr", "may", "jun",
                  "jul", "aug", "sep", "oct", "nov", "dec")

df_plot <- df_marital_trans %>%
  mutate(
    month = factor(month, levels = month_levels),
    month_num = as.numeric(month),
    y = factor(y, levels = c("no", "yes"))
  ) %>%
  mutate(group_flag = ifelse(month_num < lag(month_num, default = 0), 1, 0)) %>%
  mutate(year_offset = cumsum(group_flag)) %>%
  mutate(year = 2008 + year_offset)`}</code>
          </pre>
          <pre>
            <code>{`# Step 4: imputation strategy comparison
df_nona <- df_clean %>% drop_na()
df_truth <- na.omit(df_nona)
df_missing_sim <- prodNA(df_truth, noNA = 0.1)

mice_mod <- mice(df_missing_sim, method = "pmm", m = 1, seed = 123, print = FALSE)
df_imp_pmm <- complete(mice_mod)

rf_imp_res <- missForest(df_missing_sim, ntree = 100, verbose = FALSE)
df_imp_rf <- rf_imp_res$ximp`}</code>
          </pre>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/Default_Mosaic_Comparison.png"
                alt="Default feature reclassification comparison"
                width={1200}
                height={800}
              />
              <figcaption>
                Default reclassification before vs. after.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/heatmap.png"
                alt="Job and education cross-structure heatmap"
                width={1200}
                height={800}
              />
              <figcaption>
                Job-education structure for recoding design.
              </figcaption>
            </figure>
          </div>
          <div className="project-image-grid project-image-grid--single">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/peak_plot.png"
                alt="Education-year ridgeline chart"
                width={1200}
                height={800}
              />
              <figcaption>
                Education converted to years and validated by ridgeline.
              </figcaption>
            </figure>
          </div>

          <h2>3) EDA by Customer Profile and Contact Context</h2>
          <p>
            To preserve readability, I grouped visual evidence into profile,
            contact behavior, and campaign history views, then linked them back
            to conversion signals.
          </p>
          <div className="project-image-grid project-image-grid--three">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/plot_job.png"
                alt="Job category conversion view"
                width={1200}
                height={800}
              />
              <figcaption>Job</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/plot_education.png"
                alt="Education category conversion view"
                width={1200}
                height={800}
              />
              <figcaption>Education</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/plot_marital.png"
                alt="Marital category conversion view"
                width={1200}
                height={800}
              />
              <figcaption>Marital</figcaption>
            </figure>
          </div>
          <div className="project-image-grid project-image-grid--three">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/plot_default.png"
                alt="Default category conversion view"
                width={1200}
                height={800}
              />
              <figcaption>Default</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/rain_plot.png"
                alt="Raincloud plot for age vs category and response"
                width={1200}
                height={800}
              />
              <figcaption>Age pattern under profile segments.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/contact_plot.png"
                alt="Contact type and response relationship"
                width={1200}
                height={800}
              />
              <figcaption>Contact channel pattern.</figcaption>
            </figure>
          </div>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/month_plot.png"
                alt="Monthly distribution and success ratio"
                width={1200}
                height={800}
              />
              <figcaption>Month-year volume and success structure.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/month_rain_plot.png"
                alt="Monthly contact raincloud plot"
                width={1200}
                height={800}
              />
              <figcaption>Monthly contact distribution by outcome.</figcaption>
            </figure>
          </div>
          <div className="project-image-grid project-image-grid--three">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/week_plot.png"
                alt="Weekday effect heatmap by year and month"
                width={1200}
                height={800}
              />
              <figcaption>Day-of-week pattern.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/previous_mosaic.png"
                alt="Previous campaign effect mosaic"
                width={1200}
                height={800}
              />
              <figcaption>Previous campaign history effect.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/eco_y.png"
                alt="Macro-economic variables and response relationship"
                width={1200}
                height={800}
              />
              <figcaption>Macro indicators vs. conversion signal.</figcaption>
            </figure>
          </div>

          <h2>4) Modeling and Evaluation</h2>
          <p>
            I trained a Random Forest classifier with imbalance-aware settings
            and evaluated it using both threshold-based and ranking-based
            metrics.
          </p>
          <h3>Machine Learning Logic</h3>
          <ol>
            <li>
              Build a mixed-type preprocessing pipeline: one-hot encode
              categorical fields and passthrough numeric fields.
            </li>
            <li>
              Use stratified train/test split and Random Forest with
              <code>class_weight=balanced</code> to handle class imbalance.
            </li>
            <li>
              Evaluate with classification report, confusion matrix, and ROC-AUC
              to jointly assess threshold and ranking performance.
            </li>
            <li>
              Generate feature-importance ranking and SHAP summary to translate
              model behavior into targeting strategy.
            </li>
          </ol>
          <h3>Core ML Code Blocks (Python)</h3>
          <pre>
            <code>{`# Step 1: preprocessing + split
X = df.drop("y", axis=1)
y = df["y"].map({"yes": 1, "no": 0})

categorical_features = X.select_dtypes(include=["object"]).columns.tolist()
numerical_features = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
        ("num", "passthrough", numerical_features),
    ],
    verbose_feature_names_out=False,
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)`}</code>
          </pre>
          <pre>
            <code>{`# Step 2: model fit (imbalance-aware)
rf_model = RandomForestClassifier(
    n_estimators=500,
    min_samples_split=5,
    min_samples_leaf=2,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", rf_model),
])

pipeline.fit(X_train, y_train)`}</code>
          </pre>
          <pre>
            <code>{`# Step 3: evaluation + explainability
y_pred = pipeline.predict(X_test)
y_prob = pipeline.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_prob))

fpr, tpr, _ = roc_curve(y_test, y_prob)
cm = confusion_matrix(y_test, y_pred)

feature_names = pipeline.named_steps["preprocessor"].get_feature_names_out()
importances = pipeline.named_steps["classifier"].feature_importances_

X_test_sample = X_test.sample(n=200, random_state=42)
X_test_encoded = pipeline.named_steps["preprocessor"].transform(X_test_sample)
explainer = shap.TreeExplainer(pipeline.named_steps["classifier"])
shap_values = explainer.shap_values(X_test_encoded)`}</code>
          </pre>
          <ul>
            <li>
              <strong>Accuracy:</strong> 0.90
            </li>
            <li>
              <strong>ROC-AUC:</strong> 0.837
            </li>
          </ul>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/confusion_matrix.png"
                alt="Confusion matrix"
                width={1200}
                height={800}
              />
              <figcaption>Confusion matrix.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/roc_curve.png"
                alt="ROC curve"
                width={1200}
                height={800}
              />
              <figcaption>ROC curve (AUC 0.837).</figcaption>
            </figure>
          </div>

          <h2>5) Explainability to Strategy</h2>
          <p>
            I used feature importance and SHAP to convert model outputs into
            practical targeting guidance for telemarketing operations.
          </p>
          <div className="project-image-grid project-image-grid--two">
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/feature_importance.png"
                alt="Top feature importance"
                width={1200}
                height={800}
              />
              <figcaption>Top drivers by Random Forest importance.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/projects/bank-telemarketing/shap_summary.png"
                alt="SHAP summary"
                width={1200}
                height={800}
              />
              <figcaption>SHAP contribution patterns.</figcaption>
            </figure>
          </div>

          <h2>Final Deliverables</h2>
          <p>
            The complete report is also available here:{' '}
            <a
              href="/files/bank-telemarketing-analysis.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bank Telemarketing Analysis (PDF)
            </a>
          </p>
        </div>
      </article>
    </PageWrapper>
  );
}
