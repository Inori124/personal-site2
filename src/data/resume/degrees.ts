export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'Beijing Normal University',
    degree: 'M.S. Applied Statistics',
    link: 'https://english.bnu.edu.cn/',
    year: 2025,
  },
  {
    school: 'Anhui University',
    degree: 'B.S. Mathematics (Applied Mathematics)',
    link: 'https://www.ahu.edu.cn/',
    year: 2025,
  },
];

export default degrees;
