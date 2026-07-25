import { starterApplications } from '../src/data.js'
import type { Application, ApplicationStatus } from '../src/types.js'

type ApiRequest = {
  method?: string
  body?: Partial<Application>
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
}

const allowedStatuses: ApplicationStatus[] = ['Saved', 'Applied', 'Interview', 'Offer']

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method === 'GET') {
    response.status(200).json({ data: starterApplications })
    return
  }

  if (request.method === 'POST') {
    const body = request.body ?? {}
    const status = allowedStatuses.includes(body.status as ApplicationStatus) ? body.status as ApplicationStatus : 'Applied'

    if (!body.company || !body.role) {
      response.status(400).json({ error: 'Company and role are required' })
      return
    }

    const application: Application = {
      id: Date.now(),
      company: body.company,
      role: body.role,
      status,
      date: 'Just now'
    }

    response.status(201).json({ data: application })
    return
  }

  response.setHeader('Allow', 'GET, POST')
  response.status(405).json({ error: 'Method not allowed' })
}
