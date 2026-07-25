import { jobs } from '../src/data.js'

type QueryValue = string | string[] | undefined

type ApiRequest = {
  method?: string
  query?: {
    q?: QueryValue
    location?: QueryValue
  }
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
}

const firstValue = (value: QueryValue) => Array.isArray(value) ? value[0] : value

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const query = firstValue(request.query?.q)?.trim().toLowerCase() ?? ''
  const location = firstValue(request.query?.location)?.trim().toLowerCase() ?? ''

  const filteredJobs = jobs.filter(job => {
    const haystack = `${job.title} ${job.company} ${job.location} ${job.tags.join(' ')}`.toLowerCase()
    return haystack.includes(query) && (!location || job.location.toLowerCase().includes(location))
  })

  response.status(200).json({
    data: filteredJobs,
    meta: {
      count: filteredJobs.length
    }
  })
}
