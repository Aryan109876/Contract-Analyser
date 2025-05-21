import type { Contract, Clause } from '../types/contract'

// Mock data for contracts
const mockContracts: Contract[] = [
  {
    id: '1',
    name: 'Service Agreement - TechCorp',
    type: 'Service Agreement',
    dateAdded: '2025-03-15T10:30:00Z',
    status: 'Analyzed',
    compliance: 'Compliant',
    parties: ['Our Company', 'TechCorp Inc.'],
    expiryDate: '2026-03-15T10:30:00Z',
    value: 75000,
    content: `THIS SERVICE AGREEMENT (the "Agreement") is made and entered into as of March 15, 2025 (the "Effective Date"), by and between Our Company, a corporation organized under the laws of England ("Client"), and TechCorp Inc., a corporation organized under the laws of Delaware ("Service Provider").\n\nWHEREAS, Client wishes to engage Service Provider to provide certain technology consulting services; and\n\nWHEREAS, Service Provider wishes to provide such services to Client.\n\nNOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:\n\n1. SERVICES\n\nService Provider shall provide to Client the services set forth in Exhibit A attached hereto (the "Services"). Any additional services shall be mutually agreed upon in writing by the parties.\n\n2. COMPENSATION\n\nIn consideration for the Services, Client shall pay to Service Provider the fees set forth in Exhibit B attached hereto. Service Provider shall invoice Client monthly, and Client shall pay each invoice within thirty (30) days of receipt.\n\n3. TERM AND TERMINATION\n\nThis Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months, unless earlier terminated as provided herein. Either party may terminate this Agreement upon thirty (30) days prior written notice to the other party.\n\n4. CONFIDENTIALITY\n\nEach party acknowledges that it may receive confidential information of the other party. Each party agrees to maintain the confidentiality of such information and not to disclose it to any third party without the prior written consent of the disclosing party.\n\n5. LIMITATION OF LIABILITY\n\nIN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.\n\n6. GOVERNING LAW\n\nThis Agreement shall be governed by and construed in accordance with the laws of England, without regard to its conflict of laws principles.\n\nIN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.\n\nCLIENT: Our Company\n\nBy: _________________________\nName: John Smith\nTitle: Chief Executive Officer\n\nSERVICE PROVIDER: TechCorp Inc.\n\nBy: _________________________\nName: Jane Doe\nTitle: Chief Operating Officer`,
    versions: [
      {
        id: '1-v1',
        version: '1.0',
        date: '2025-02-28',
        description: 'Initial draft',
        changes: {
          added: 0,
          modified: 0,
          removed: 0
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Employment Contract - J. Williams',
    type: 'Employment',
    dateAdded: '2025-03-10T15:45:00Z',
    status: 'Analyzed',
    compliance: 'Minor Issues',
    parties: ['Our Company', 'James Williams'],
    expiryDate: undefined,
    content: 'Sample employment contract content...',
    versions: []
  },
  {
    id: '3',
    name: 'NDA - FinTech Solutions',
    type: 'NDA',
    dateAdded: '2025-03-05T09:15:00Z',
    status: 'In Review',
    compliance: 'Pending',
    parties: ['Our Company', 'FinTech Solutions Ltd.'],
    expiryDate: '2027-03-05T09:15:00Z',
    content: 'Sample NDA content...',
    versions: []
  },
  {
    id: '4',
    name: 'Office Lease Agreement',
    type: 'Lease',
    dateAdded: '2025-02-28T11:30:00Z',
    status: 'Analyzed',
    compliance: 'Major Issues',
    parties: ['Our Company', 'Commercial Properties LLC'],
    expiryDate: '2030-02-28T11:30:00Z',
    value: 250000,
    content: 'Sample lease agreement content...',
    versions: []
  },
  {
    id: '5',
    name: 'Software License Agreement',
    type: 'License',
    dateAdded: '2025-02-20T14:00:00Z',
    status: 'Pending',
    compliance: 'Pending',
    parties: ['Our Company', 'Software Vendor Inc.'],
    expiryDate: '2026-02-20T14:00:00Z',
    value: 35000,
    content: 'Sample software license agreement content...',
    versions: []
  }
]

// Mock data for clauses
const mockClauses: Record<string, Clause[]> = {
  '1': [
    {
      id: 'clause-1',
      title: 'Limitation of Liability',
      type: 'Liability',
      text: 'IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
      hasIssues: true,
      severity: 'medium',
      issues: [
        {
          title: 'Overly broad liability exclusion',
          description: 'This clause may be unenforceable under UK law as it attempts to exclude all liability for consequential damages without specific limitations.',
          severity: 'medium',
          regulation: 'Unfair Contract Terms Act 1977'
        }
      ],
      suggestedRevision: 'NEITHER PARTY SHALL BE LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EXCEPT IN CASES OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, AND IN NO EVENT SHALL EITHER PARTY\'S TOTAL LIABILITY EXCEED THE TOTAL FEES PAID BY CLIENT TO SERVICE PROVIDER UNDER THIS AGREEMENT.',
      tags: ['liability', 'exclusion', 'damages']
    },
    {
      id: 'clause-2',
      title: 'Governing Law',
      type: 'Legal',
      text: 'This Agreement shall be governed by and construed in accordance with the laws of England, without regard to its conflict of laws principles.',
      hasIssues: false,
      tags: ['governing law', 'jurisdiction']
    },
    {
      id: 'clause-3',
      title: 'Confidentiality',
      type: 'Confidentiality',
      text: 'Each party acknowledges that it may receive confidential information of the other party. Each party agrees to maintain the confidentiality of such information and not to disclose it to any third party without the prior written consent of the disclosing party.',
      hasIssues: true,
      severity: 'low',
      issues: [
        {
          title: 'Missing definition of Confidential Information',
          description: 'The clause does not clearly define what constitutes "confidential information," which may lead to disputes.',
          severity: 'low'
        },
        {
          title: 'No time limitation for confidentiality obligations',
          description: 'The confidentiality obligation appears to be perpetual, which may be considered unreasonable under certain circumstances.',
          severity: 'low'
        }
      ],
      suggestedRevision: 'Each party acknowledges that in the performance of its obligations under this Agreement, it may receive confidential information of the other party ("Confidential Information"). Confidential Information shall include all information marked as confidential or proprietary, or information that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure. Each party agrees to maintain the confidentiality of such Confidential Information and not to disclose it to any third party without the prior written consent of the disclosing party, for a period of five (5) years following the termination of this Agreement.',
      tags: ['confidentiality', 'non-disclosure']
    },
    {
      id: 'clause-4',
      title: 'Term and Termination',
      type: 'Termination',
      text: 'This Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months, unless earlier terminated as provided herein. Either party may terminate this Agreement upon thirty (30) days prior written notice to the other party.',
      hasIssues: false,
      tags: ['term', 'termination', 'duration']
    }
  ]
}

/**
 * Get all contracts
 * @returns Promise<Contract[]>
 */
export const getContracts = async (): Promise<Contract[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockContracts)
    }, 500)
  })
}

/**
 * Get recent contracts (limited to 5)
 * @returns Promise<Contract[]>
 */
export const getRecentContracts = async (): Promise<Contract[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by date added (newest first) and limit to 5
      const sorted = [...mockContracts].sort((a, b) => {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      })
      resolve(sorted.slice(0, 5))
    }, 300)
  })
}

/**
 * Get contract by ID
 * @param id Contract ID
 * @returns Promise<Contract>
 */
export const getContractById = async (id: string): Promise<Contract> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const contract = mockContracts.find(c => c.id === id)
      if (contract) {
        resolve(contract)
      } else {
        reject(new Error(`Contract with ID ${id} not found`))
      }
    }, 300)
  })
}

/**
 * Get clauses for a specific contract
 * @param contractId Contract ID
 * @returns Promise<Clause[]>
 */
export const getContractClauses = async (contractId: string): Promise<Clause[]> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const clauses = mockClauses[contractId]
      if (clauses) {
        resolve(clauses)
      } else {
        // Return empty array if no clauses found for this contract
        resolve([])
      }
    }, 300)
  })
}