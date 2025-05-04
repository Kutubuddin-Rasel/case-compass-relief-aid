
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Note {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CaseNotesProps {
  notes: Note[];
  isAdmin: boolean;
  caseId: string;
}

const CaseNotes = ({ notes, isAdmin, caseId }: CaseNotesProps) => {
  const [notesList, setNotesList] = useState<Note[]>(notes);
  const [newNote, setNewNote] = useState<string>('');
  
  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast.error('Note content cannot be empty');
      return;
    }
    
    const currentUser = isAdmin ? 'Admin User' : 'John Doe';
    const note = {
      id: `note${Date.now()}`,
      author: currentUser,
      content: newNote,
      timestamp: new Date().toISOString(),
    };
    
    setNotesList([...notesList, note]);
    setNewNote('');
    toast.success('Note added successfully');
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="bg-white p-4 rounded-md border">
          <h3 className="text-lg font-medium mb-2">Add New Note</h3>
          <Textarea
            placeholder="Type your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mb-3"
            rows={4}
          />
          <Button onClick={handleAddNote}>Add Note</Button>
        </div>
      )}
      
      <div className="bg-white rounded-md border">
        <h3 className="text-lg font-medium p-4 border-b">Case Notes</h3>
        
        <div className="divide-y">
          {notesList.length > 0 ? (
            notesList.map((note) => (
              <div key={note.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="font-medium">{note.author}</div>
                  <div className="text-sm text-gray-500">{formatDate(note.timestamp)}</div>
                </div>
                <p className="mt-2 text-gray-700">{note.content}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notes available for this case.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseNotes;
