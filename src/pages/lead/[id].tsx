// pages/lead/[id].tsx

"use client";

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock leads data for demo purposes (you would likely fetch this from an API)
const initialLeads = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'New', lastContact: '2023-05-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Contacted', lastContact: '2023-04-20' },
];

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  lastContact: string;
}

export default function LeadPage() {
  const router = useRouter();
  const { id } = router.query; // Get the lead ID from the URL
  const [lead, setLead] = useState<Lead | null>(null);
  const [editLead, setEditLead] = useState<Omit<Lead, 'id'>>({ name: '', email: '', status: 'New', lastContact: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch the lead by ID (using mock data here)
      const lead = initialLeads.find((lead) => lead.id === parseInt(id as string));
      if (lead) {
        setLead(lead);
        setEditLead({ name: lead.name, email: lead.email, status: lead.status, lastContact: lead.lastContact });
      }
    }
  }, [id]);

  const handleSave = () => {
    if (lead) {
      // Update the lead data (mock update logic)
      const updatedLead = { ...lead, ...editLead };
      console.log('Updated lead:', updatedLead);
      setLead(updatedLead);
      setIsEditing(false);
      // In a real app, you would make an API request to save changes.
    }
  };

  if (!lead) {
    return <div>Loading...</div>; // Show a loading state if lead is not found yet
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lead Details</h1>
      
      {isEditing ? (
        <div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={editLead.name}
                onChange={(e) => setEditLead({ ...editLead, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                value={editLead.email}
                onChange={(e) => setEditLead({ ...editLead, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select
                value={editLead.status}
                onValueChange={(value) => setEditLead({ ...editLead, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastContact" className="text-right">Last Contact</Label>
              <Input
                id="lastContact"
                type="date"
                value={editLead.lastContact}
                onChange={(e) => setEditLead({ ...editLead, lastContact: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Last Contact:</strong> {lead.lastContact}</p>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </div>
      )}
    </div>
  );
}
