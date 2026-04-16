function getServiceOrigin(port: number) {
  if (typeof window === 'undefined') {
    return `http://localhost:${port}`
  }

  return `${window.location.protocol}//${window.location.hostname}:${port}`
}

export function getDocsUrl() {
  return getServiceOrigin(3001)
}

export function getApiHealthUrl() {
  return `${getServiceOrigin(3002)}/health`
}

export function openDocs() {
  window.location.assign(getDocsUrl())
}
