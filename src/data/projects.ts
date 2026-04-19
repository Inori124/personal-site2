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
    title: 'LLM Reasoning Eval',
    subtitle: 'Framework Design · Python',
    image: '/images/projects/nearestdollar.jpg',
    date: '2026-01-31',
    desc: 'Designed a multi-dimensional evaluation framework for mathematical reasoning in LLMs, emphasizing logical consistency and step-by-step verification.',
    tech: ['Python', 'LLM Evaluation', 'Prompt Engineering'],
    featured: true,
  },
  {
    title: 'PISA Data Analysis',
    subtitle: 'R (Tidyverse) · Educational Data Mining',
    image: '/images/projects/harvest.jpg',
    date: '2026-01-30',
    desc: 'Analyzed global student performance data with tidyverse to examine links between socioeconomic status and learning outcomes.',
    tech: ['R', 'tidyverse', 'Data Visualization'],
    featured: true,
  },
  {
    title: 'Bank Marketing Prediction',
    subtitle: 'Machine Learning · R',
    link: '/writing/eurostar-chatbot-analysis',
    image: '/images/projects/spacepotato.jpg',
    date: '2026-01-30',
    desc: 'Built Random Forest based conversion prediction pipelines and handled class imbalance with SMOTE to improve campaign targeting.',
    tech: ['R', 'Random Forest', 'SMOTE', 'EDA'],
    featured: true,
  },
];

export default data;
