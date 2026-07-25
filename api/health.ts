type ApiRequest = {
  method?: string
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
}

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  response.status(200).json({
    status: 'ok',
    service: 'hireflow-api'
  })
}
