
export interface Achievement {
  title: string;
  year: string;
}

export interface Experience {
  role: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface Reference {
  name: string;
  title: string;
  org: string;
  phone: string;
  email: string;
}
