import type { StandardClause } from '../types/clause'

// Mock data for standard clauses
const mockStandardClauses: StandardClause[] = [
  {
    id: 'std-1',
    title: 'Standard Limitation of Liability',
    category: 'liability',
    text: 'NEITHER PARTY SHALL BE LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EXCEPT IN CASES OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, AND IN NO EVENT SHALL EITHER PARTY\'S TOTAL LIABILITY EXCEED THE TOTAL FEES PAID UNDER THIS AGREEMENT.',
    tags: ['liability', 'limitation', 'damages', 'UK-compliant'],
    complianceRating: 4.5,
    usageGuidance: 'This clause limits liability for indirect damages while maintaining compliance with UK regulations by excluding willful misconduct and gross negligence, and capping total liability to fees paid.',
    regulations: [
      {
        name: 'Unfair Contract Terms Act 1977',
        description: 'Complies with requirements for reasonableness in B2B contracts',
        compliant: true
      },
      {
        name: 'Consumer Rights Act 2015',
        description: 'May not be suitable for B2C contracts without modification',
        compliant: false
      }
    ]
  },
  {
    id: 'std-2',
    title: 'Comprehensive Confidentiality Clause',
    category: 'confidentiality',
    text: 'Each party acknowledges that in the performance of its obligations under this Agreement, it may receive confidential information of the other party ("Confidential Information"). Confidential Information shall include all information marked as confidential or proprietary, or information that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure. Each party agrees to maintain the confidentiality of such Confidential Information and not to disclose it to any third party without the prior written consent of the disclosing party, for a period of five (5) years following the termination of this Agreement.',
    tags: ['confidentiality', 'non-disclosure', 'time-limited', 'UK-compliant'],
    complianceRating: 5.0,
    usageGuidance: 'This comprehensive confidentiality clause includes a clear definition of what constitutes confidential information and sets a reasonable time limit on the confidentiality obligation.',
    regulations: [
      {
        name: 'Trade Secrets Directive (EU) 2016/943',
        description: 'Aligned with requirements for protecting confidential business information',
        compliant: true
      }
    ]
  },
  {
    id: 'std-3',
    title: 'GDPR Compliant Data Processing Clause',
    category: 'data-protection',
    text: 'The parties acknowledge that the Service Provider may process personal data on behalf of the Client in connection with this Agreement. The Service Provider shall process such personal data only in accordance with the Client\'s documented instructions, this Agreement, and applicable data protection laws, including but not limited to the UK General Data Protection Regulation ("UK GDPR") and the Data Protection Act 2018. The Service Provider shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including pseudonymization and encryption of personal data where appropriate.',
    tags: ['GDPR', 'data protection', 'data processing', 'UK-compliant'],
    complianceRating: 4.8,
    usageGuidance: 'This clause establishes data processing responsibilities in compliance with UK GDPR requirements. It should be included in any agreement where one party will process personal data on behalf of the other.',
    regulations: [
      {
        name: 'UK GDPR',
        description: 'Complies with processor obligations under Article 28',
        compliant: true
      },
      {
        name: 'Data Protection Act 2018',
        description: 'Meets UK-specific requirements for data processing',
        compliant: true
      }
    ]
  },
  {
    id: 'std-4',
    title: 'Standard Termination Clause',
    category: 'termination',
    text: 'This Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months (the "Initial Term"), unless earlier terminated as provided herein. Following the Initial Term, this Agreement shall automatically renew for successive one (1) year periods, unless either party provides written notice of non-renewal at least sixty (60) days prior to the end of the then-current term. Either party may terminate this Agreement for convenience upon thirty (30) days prior written notice to the other party.',
    tags: ['termination', 'term', 'renewal', 'notice period'],
    complianceRating: 4.0,
    usageGuidance: 'This termination clause includes an initial term with automatic renewal, requiring explicit opt-out. It provides for termination for convenience with reasonable notice.',
    regulations: [
      {
        name: 'Consumer Contracts Regulations 2013',
        description: 'May require modification for consumer contracts to allow for early termination rights',
        compliant: false
      }
    ]
  },
  {
    id: 'std-5',
    title: 'Force Majeure Clause',
    category: 'force-majeure',
    text: 'Neither party shall be liable for any failure or delay in performance under this Agreement (other than for payment of money) to the extent such failure or delay is caused by circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, epidemics, or strikes. If such an event occurs, the affected party shall give prompt written notice to the other party and shall use reasonable efforts to minimize the impact of such event.',
    tags: ['force majeure', 'acts of God', 'unforeseeable events'],
    complianceRating: 4.2,
    usageGuidance: 'This force majeure clause excuses non-performance due to events outside a party\'s control, while requiring reasonable efforts to mitigate impact. It explicitly excludes payment obligations.',
    regulations: [
      {
        name: 'Common Law Principles',
        description: 'Aligned with established principles on excusing performance',
        compliant: true
      }
    ]
  },
  {
    id: 'std-6',
    title: 'Governing Law and Dispute Resolution',
    category: 'legal',
    text: 'This Agreement shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of laws principles. Any dispute arising out of or in connection with this Agreement, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration under the LCIA Rules, which Rules are deemed to be incorporated by reference into this clause. The number of arbitrators shall be one. The seat, or legal place, of arbitration shall be London, England. The language to be used in the arbitral proceedings shall be English.',
    tags: ['governing law', 'jurisdiction', 'arbitration', 'LCIA'],
    complianceRating: 4.5,
    usageGuidance: 'This clause establishes English law as governing and provides for arbitration in London under LCIA rules, which offers a neutral and efficient dispute resolution mechanism.',
    regulations: [
      {
        name: 'Arbitration Act 1996',
        description: 'Complies with requirements for valid arbitration agreements',
        compliant: true
      }
    ]
  }
]

/**
 * Get all standard clauses
 * @returns Promise<StandardClause[]>
 */
export const getStandardClauses = async (): Promise<StandardClause[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStandardClauses)
    }, 500)
  })
}

/**
 * Get standard clause by ID
 * @param id Standard clause ID
 * @returns Promise<StandardClause>
 */
export const getStandardClauseById = async (id: string): Promise<StandardClause> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const clause = mockStandardClauses.find(c => c.id === id)
      if (clause) {
        resolve(clause)
      } else {
        reject(new Error(`Standard clause with ID ${id} not found`))
      }
    }, 300)
  })
}