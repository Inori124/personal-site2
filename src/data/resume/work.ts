/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'ByteDance',
    position: 'AI Expertise Intern (SFT)',
    url: 'https://www.bytedance.com/',
    startDate: '2023-12-01',
    endDate: '2024-03-01',
    summary:
      'Constructed and evaluated high-quality reasoning datasets for large language models.',
    highlights: [
      'Designed structured criteria to assess logical consistency and reliability in LLM outputs.',
      'Built quality control workflows for mathematical reasoning data used in supervised fine-tuning.',
      'Used Python to clean and analyze large-scale text data for dataset optimization.',
    ],
  },
  {
    name: 'Guotai Junan Securities Co., Ltd.',
    position: 'Industry Research Intern (Computer Team)',
    url: 'https://www.gtja.com/',
    startDate: '2023-04-01',
    endDate: '2023-10-01',
    summary:
      'Supported AI-sector industry research by building data-driven analysis frameworks across computing power, applications, and foundational technologies.',
    highlights: [
      'Collected, cleaned, and benchmarked financial and industry data to support multiple AI-focused research reports.',
      'Developed a structured research framework for tracking key AI value-chain segments and market signals.',
      'Independently wrote an AI research framework and educational handbook published on the team’s public account, improving internal research efficiency and decision support.',
    ],
  },
];

export default work;
