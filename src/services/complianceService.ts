import type { ComplianceRule } from '../types/compliance'

// Mock data for compliance rules
const mockComplianceRules: ComplianceRule[] = [
  {
    id: 'rule-1',
    name: 'Limitation of Liability Reasonableness',
    description: 'Detects overly broad liability exclusion clauses that may be unenforceable under UK law',
    regulation: 'Unfair Contract Terms Act 1977',
    category: 'legal',
    severity: 'High',
    active: true,
    pattern: '\\b(any|all)\\s+(liability|damages)\\b|\\bliability\\s+for\\s+(any|all)\\b',
    guidance: 'Limitations of liability must be reasonable under the circumstances. Avoid blanket exclusions of all liability, and specifically exclude liability for willful misconduct or gross negligence. Consider capping liability to fees paid or a reasonable amount related to the contract value.',
    nonCompliantExample: 'IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER PARTY FOR ANY DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT.',
    compliantExample: 'NEITHER PARTY SHALL BE LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EXCEPT IN CASES OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, AND IN NO EVENT SHALL EITHER PARTY\'S TOTAL LIABILITY EXCEED THE TOTAL FEES PAID UNDER THIS AGREEMENT.'
  },
  {
    id: 'rule-2',
    name: 'Missing Data Protection Provisions',
    description: 'Detects contracts involving data processing that lack necessary GDPR compliance language',
    regulation: 'UK GDPR / Data Protection Act 2018',
    category: 'data-protection',
    severity: 'High',
    active: true,
    pattern: '\\bpersonal\\s+data\\b|\\bdata\\s+processing\\b',
    guidance: 'Contracts involving processing of personal data must include specific provisions required by Article 28 of the UK GDPR, including processor obligations, security measures, and sub-processor requirements.',
    nonCompliantExample: 'The Service Provider shall process personal data as necessary to provide the services described in this Agreement.',
    compliantExample: 'The Service Provider shall process personal data only in accordance with the Client\'s documented instructions, this Agreement, and applicable data protection laws, including but not limited to the UK GDPR. The Service Provider shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.'
  },
  {
    id: 'rule-3',
    name: 'Unfair Early Termination Penalties',
    description: 'Detects potentially unfair penalties for early termination of contracts',
    regulation: 'Consumer Rights Act 2015 / Common Law Principles',
    category: 'financial',
    severity: 'Medium',
    active: true,
    pattern: '\\b(termination|early)\\s+(fee|penalty|charge)\\b',
    guidance: 'Early termination penalties must be a genuine pre-estimate of loss and not punitive. They should be proportionate to the remaining value of the contract and take into account costs saved by the supplier due to early termination.',
    nonCompliantExample: 'In the event of early termination by the Client, the Client shall pay a penalty equal to 100% of the fees for the remainder of the term.',
    compliantExample: 'In the event of early termination by the Client, the Client shall pay a fee equal to 50% of the remaining fees for the unexpired portion of the term, representing a reasonable pre-estimate of Service Provider\'s losses resulting from early termination.'
  },
  {
    id: 'rule-4',
    name: 'Automatic Renewal Without Notice',
    description: 'Identifies automatic renewal clauses that fail to provide adequate notice to the customer',
    regulation: 'Consumer Contracts Regulations 2013',
    category: 'legal',
    severity: 'Medium',
    active: true,
    pattern: '\\bautomatic\\s+(renewal|extension)\\b|\\bautomatically\\s+(renew|extend)\\b',
    guidance: 'Automatic renewal clauses must provide adequate notice to customers before renewal. Include a requirement to provide notice of upcoming renewal at least 30-60 days in advance.',
    nonCompliantExample: 'This Agreement shall automatically renew for successive 12-month terms unless terminated.',
    compliantExample: 'This Agreement shall automatically renew for successive 12-month terms unless either party provides written notice of non-renewal at least 60 days prior to the end of the then-current term. Service Provider shall provide Client with written notice of upcoming renewal at least 90 days prior to the end of the then-current term.'
  },
  {
    id: 'rule-5',
    name: 'Interest Rate Compliance',
    description: 'Checks that interest rates for late payments are within legal limits',
    regulation: 'Late Payment of Commercial Debts (Interest) Act 1998',
    category: 'financial',
    severity: 'Medium',
    active: true,
    pattern: '\\binterest\\s+rate\\b|\\binterest\\s+at\\s+(a|the)\\s+rate\\b',
    guidance: 'Interest rates for late payments in commercial contracts should not exceed the statutory rate (currently Bank of England base rate plus 8%). Reference the statutory rate rather than a fixed percentage to ensure compliance over time.',
    nonCompliantExample: 'Late payments shall accrue interest at a rate of 18% per annum.',
    compliantExample: 'Late payments shall accrue interest at the statutory rate as defined in the Late Payment of Commercial Debts (Interest) Act 1998, currently at 8 percentage points above the Bank of England base rate.'
  },
  {
    id: 'rule-6',
    name: 'Missing Intellectual Property Assignment',
    description: 'Identifies contracts for creative or development work that lack clear IP assignment provisions',
    regulation: 'Copyright, Designs and Patents Act 1988',
    category: 'intellectual-property',
    severity: 'High',
    active: true,
    pattern: '\\b(development|software|design|creative)\\s+(services|work)\\b',
    guidance: 'Contracts for creative or development work should include clear provisions regarding ownership and assignment of intellectual property rights.',
    nonCompliantExample: 'Service Provider shall develop custom software for Client as specified in the Statement of Work.',
    compliantExample: 'Service Provider shall develop custom software for Client as specified in the Statement of Work. All intellectual property rights, including copyright, in the deliverables created by Service Provider under this Agreement shall be assigned to Client upon payment in full.'
  },
  {
    id: 'rule-7',
    name: 'Unclear Definition of Confidential Information',
    description: 'Detects confidentiality clauses with vague or missing definitions of what constitutes confidential information',
    regulation: 'Common Law Principles',
    category: 'legal',
    severity: 'Low',
    active: true,
    pattern: '\\bconfidential\\s+information\\b|\\bconfidentiality\\b',
    guidance: 'Confidentiality clauses should clearly define what constitutes confidential information, including marking requirements or categories of information considered confidential.',
    nonCompliantExample: 'Each party shall keep the other party\'s confidential information secret.',
    compliantExample: 'Each party shall keep the other party\'s Confidential Information secret. "Confidential Information" means any information that is marked as confidential or that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure.'
  },
  {
    id: 'rule-8',
    name: 'Force Majeure Scope',
    description: 'Analyzes force majeure clauses for appropriate scope and exclusions',
    regulation: 'Common Law Principles',
    category: 'legal',
    severity: 'Low',
    active: true,
    pattern: '\\bforce\\s+majeure\\b|\\bact(s)?\\s+of\\s+God\\b',
    guidance: 'Force majeure clauses should be specific about covered events, require prompt notification, and exclude payment obligations.',
    nonCompliantExample: 'Neither party shall be liable for failure to perform due to force majeure events.',
    compliantExample: 'Neither party shall be liable for any failure or delay in performance (other than for payment of money) to the extent caused by circumstances beyond its reasonable control, including but not limited to natural disasters, war, or pandemics. The affected party shall promptly notify the other party and use reasonable efforts to minimize the impact.'
  },
  {
    id: 'rule-9',
    name: 'Proper Governing Law Clause',
    description: 'Ensures contracts have clear governing law and jurisdiction provisions',
    regulation: 'Legal Best Practices',
    category: 'legal',
    severity: 'Medium',
    active: true,
    pattern: '\\bgoverning\\s+law\\b|\\bjurisdiction\\b',
    guidance: 'Contracts should specify the governing law and court or arbitration forum for dispute resolution.',
    nonCompliantExample: 'Any disputes shall be resolved according to applicable law.',
    compliantExample: 'This Agreement shall be governed by and construed in accordance with the laws of England and Wales. The parties submit to the exclusive jurisdiction of the English courts.'
  },
  {
    id: 'rule-10',
    name: 'Supplier Liability Insurance Requirements',
    description: 'Checks for appropriate insurance requirements for service providers',
    regulation: 'Industry Best Practices',
    category: 'financial',
    severity: 'Medium',
    active: false,
    pattern: '\\binsurance\\b|\\bindemnity\\b|\\bindemnification\\b',
    guidance: 'Service contracts should include requirements for suppliers to maintain appropriate insurance coverage, including professional liability/E&O, cyber liability (where relevant), and general commercial liability.',
    nonCompliantExample: 'Service Provider shall maintain adequate insurance coverage.',
    compliantExample: 'Service Provider shall maintain, at its own expense: (a) Professional Liability Insurance with limits of not less than £2,000,000 per claim; (b) Commercial General Liability Insurance with limits of not less than £1,000,000 per occurrence; and (c) Cyber Liability Insurance with limits of not less than £1,000,000 per claim. Service Provider shall provide certificates of insurance upon request.'
  }
]

/**
 * Get all compliance rules
 * @returns Promise<ComplianceRule[]>
 */
export const getComplianceRules = async (): Promise<ComplianceRule[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComplianceRules)
    }, 500)
  })
}

/**
 * Get compliance rule by ID
 * @param id Compliance rule ID
 * @returns Promise<ComplianceRule>
 */
export const getComplianceRuleById = async (id: string): Promise<ComplianceRule> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rule = mockComplianceRules.find(r => r.id === id)
      if (rule) {
        resolve(rule)
      } else {
        reject(new Error(`Compliance rule with ID ${id} not found`))
      }
    }, 300)
  })
}