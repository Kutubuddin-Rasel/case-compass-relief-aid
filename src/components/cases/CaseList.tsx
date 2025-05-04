
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const mockCases = [
  {
    id: 'CS-2023-001',
    title: 'Medical Treatment Support',
    status: 'open',
    lastUpdated: '2025-05-01T14:30:00',
    type: 'medical',
  },
  {
    id: 'CS-2023-002',
    title: 'Legal Aid Application',
    status: 'in-progress',
    lastUpdated: '2025-04-28T09:15:00',
    type: 'legal',
  },
  {
    id: 'CS-2023-003',
    title: 'Rehabilitation Program',
    status: 'closed',
    lastUpdated: '2025-04-15T16:45:00',
    type: 'support',
  },
  {
    id: 'CS-2023-004',
    title: 'Emergency Housing Assistance',
    status: 'open',
    lastUpdated: '2025-05-03T11:20:00',
    type: 'support',
  },
];

interface CaseListProps {
  isAdmin?: boolean;
}

const CaseList = ({ isAdmin = false }: CaseListProps) => {
  const [cases, setCases] = useState(mockCases);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const filteredCases = cases.filter((c) => {
    // Apply status filter
    if (filter !== 'all' && c.status !== filter) return false;
    
    // Apply search filter
    if (
      search &&
      !c.id.toLowerCase().includes(search.toLowerCase()) &&
      !c.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };
  
  const handleCreateCase = () => {
    navigate('/cases/new');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>{isAdmin ? 'All Cases' : 'My Cases'}</CardTitle>
          <CardDescription>
            {isAdmin ? 'Manage all victim cases' : 'View and manage your cases'}
          </CardDescription>
        </div>
        
        {isAdmin && (
          <Button onClick={handleCreateCase}>
            New Case
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by case ID or title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="mb-3 sm:mb-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 mr-2">{c.id}</span>
                  <Badge className={getStatusColor(c.status)}>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </div>
                <h4 className="font-medium text-gray-900 mt-1">{c.title}</h4>
                <p className="text-sm text-gray-500">Last updated: {formatDate(c.lastUpdated)}</p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewCase(c.id)}
                className="w-full sm:w-auto"
              >
                View Details
              </Button>
            </div>
          ))}
          
          {filteredCases.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No cases found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseList;
