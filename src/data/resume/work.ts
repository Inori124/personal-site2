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
];

export default work;
