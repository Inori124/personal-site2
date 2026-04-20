export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  image: string;
  date: string;
  desc: string;
  tech?: string[];
  featured?: boolean;
}

const data: Project[] = [
  {
    title: 'Internet Finance Risk Control',
    subtitle: 'Credit Default Modeling · Python',
    link: '/projects/internet-finance-risk-control',
    image: '/images/projects/nearestdollar.jpg',
    date: '2026-01-31',
    desc: 'Built an end-to-end credit-risk workflow on Home Credit data, covering data governance, feature engineering, model evaluation, and explainability.',
    tech: ['Python', 'LightGBM', 'Random Forest', 'Risk Modeling', 'SHAP'],
    featured: true,
  },
  {
    title: 'Bank Telemarketing Strategy Analysis',
    subtitle: 'Machine Learning · R/Python',
    link: '/projects/bank-telemarketing-strategy-analysis',
    image: '/images/projects/spacepotato.jpg',
    date: '2026-01-30',
    desc: 'Built a conversion prediction workflow for bank telemarketing and translated model insights into practical campaign targeting strategies.',
    tech: [
      'R',
      'Python',
      'Random Forest',
      'Class Weighting',
      'SHAP',
      'ROC-AUC',
      'EDA',
    ],
    featured: true,
  },
];

export default data;
