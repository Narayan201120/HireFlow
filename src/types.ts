export type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  tags: string[]
  color: string
  initials: string
}

export type ApplicationStatus = 'Saved' | 'Applied' | 'Interview' | 'Offer'

export type Application = {
  id: number
  company: string
  role: string
  status: ApplicationStatus
  date: string
}
