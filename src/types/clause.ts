export interface StandardClause {
  id: string
  title: string
  category: string
  text: string
  tags: string[]
  complianceRating: number
  usageGuidance?: string
  regulations?: RegulationInfo[]
}

export interface RegulationInfo {
  name: string
  description: string
  compliant: boolean
}