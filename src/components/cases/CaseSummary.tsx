
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CaseSummaryProps {
  caseData: {
    id: string;
    title: string;
    status: string;
    victim: string;
    description: string;
    lastUpdated: string;
    type: string;
    assignedStaff: string;
    openDate: string;
  };
  isAdmin: boolean;
}

const CaseSummary = ({ caseData, isAdmin }: CaseSummaryProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Case ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{caseData.id}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">{caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Case Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{caseData.type.charAt(0).toUpperCase() + caseData.type.slice(1)}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Victim</dt>
              <dd className="mt-1 text-sm text-gray-900">{caseData.victim}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Assigned Staff</dt>
              <dd className="mt-1 text-sm text-gray-900">{caseData.assignedStaff}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(caseData.lastUpdated).toLocaleString()}</dd>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{caseData.description}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              This section contains additional administrative information about the case
              that is only visible to administrators. It could include internal notes,
              resource allocations, or other sensitive information.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CaseSummary;
