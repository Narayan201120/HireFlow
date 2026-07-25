import type { Application, Job } from './types'

export const jobs: Job[] = [
  { id: 1, title: 'Frontend Engineer', company: 'Northstar', location: 'Remote · India', type: 'Full-time', salary: '₹18–26 LPA', tags: ['React', 'TypeScript'], color: '#FCE2C8', initials: 'N' },
  { id: 2, title: 'Product Designer', company: 'Pollen', location: 'Hyderabad, India', type: 'Full-time', salary: '₹14–20 LPA', tags: ['Figma', 'Research'], color: '#DDE8FF', initials: 'P' },
  { id: 3, title: 'Software Engineer', company: 'Waypoint', location: 'Remote · India', type: 'Full-time', salary: '₹16–24 LPA', tags: ['Node.js', 'Postgres'], color: '#DDF3E7', initials: 'W' },
  { id: 4, title: 'Data Analyst', company: 'Tandem', location: 'Bengaluru, India', type: 'Hybrid', salary: '₹10–15 LPA', tags: ['SQL', 'Python'], color: '#F1DDF7', initials: 'T' },
  { id: 5, title: 'Backend Engineer', company: 'Orbit Labs', location: 'Remote · India', type: 'Full-time', salary: '₹20–30 LPA', tags: ['Go', 'AWS'], color: '#FDE7B8', initials: 'O' },
  { id: 6, title: 'Growth Marketer', company: 'Clover', location: 'Mumbai, India', type: 'Full-time', salary: '₹12–18 LPA', tags: ['SEO', 'Analytics'], color: '#D8EEF4', initials: 'C' }
]

export const starterApplications: Application[] = [
  { id: 1, company: 'Northstar', role: 'Frontend Engineer', status: 'Applied', date: 'Today' },
  { id: 2, company: 'Pollen', role: 'Product Designer', status: 'Interview', date: 'Yesterday' },
  { id: 3, company: 'Waypoint', role: 'Software Engineer', status: 'Saved', date: 'Jul 21' }
]
