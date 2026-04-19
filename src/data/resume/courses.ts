export interface Course {
  title: string;
  number: string;
  link: string;
  university: string;
}

const courses: Course[] = [
  {
    title: 'Advanced Multivariate Statistics',
    number: 'STAT-701',
    link: 'https://english.bnu.edu.cn/',
    university: 'Beijing Normal University',
  },
  {
    title: 'Machine Learning',
    number: 'STAT-702',
    link: 'https://english.bnu.edu.cn/',
    university: 'Beijing Normal University',
  },
  {
    title: 'Advanced Algebra',
    number: 'MATH-301',
    link: 'https://www.ahu.edu.cn/',
    university: 'Anhui University',
  },
  {
    title: 'Mathematical Analysis',
    number: 'MATH-302',
    link: 'https://www.ahu.edu.cn/',
    university: 'Anhui University',
  },
  {
    title: 'Experimental Design and Causal Inference',
    number: 'STAT-703',
    link: 'https://english.bnu.edu.cn/',
    university: 'Beijing Normal University',
  },
];

export default courses;
