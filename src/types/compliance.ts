export interface ComplianceRule {
  id: string
  name: string
  description: string
  regulation: string
  category: string
  severity: string
  active: boolean
  pattern: string
  guidance: string
  nonCompliantExample: string
  compliantExample: string
}