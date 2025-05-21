export interface Contract {
  id: string
  name: string
  type: string
  dateAdded: string
  status: string
  compliance: string
  parties: string[]
  expiryDate?: string
  value?: number
  content: string
  versions?: ContractVersion[]
}

export interface ContractVersion {
  id: string
  version: string
  date: string
  description: string
  changes: {
    added: number
    modified: number
    removed: number
  }
}

export interface Clause {
  id: string
  title: string
  type: string
  text: string
  hasIssues: boolean
  severity?: 'high' | 'medium' | 'low'
  issues?: ClauseIssue[]
  suggestedRevision?: string
  tags?: string[]
  references?: string[]
}

export interface ClauseIssue {
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  regulation?: string
}