"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    {
      id: "1",
      name: "Acme Inc",
      contact: "John Doe",
      email: "john@acme.com",
      status: "Active",
      healthScore: 92,
      lastContact: "2 days ago",
    },
    {
      id: "2",
      name: "TechGiant",
      contact: "Sarah Smith",
      email: "sarah@techgiant.com",
      status: "Active",
      healthScore: 87,
      lastContact: "1 week ago",
    },
    {
      id: "3",
      name: "Innovate Co",
      contact: "Michael Brown",
      email: "michael@innovate.co",
      status: "At Risk",
      healthScore: 58,
      lastContact: "3 weeks ago",
    },
    {
      id: "4",
      name: "Global Services",
      contact: "Emily Johnson",
      email: "emily@global.services",
      status: "Inactive",
      healthScore: 35,
      lastContact: "2 months ago",
    },
    {
      id: "5",
      name: "Future Tech",
      contact: "David Wilson",
      email: "david@future.tech",
      status: "Active",
      healthScore: 95,
      lastContact: "Yesterday",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage and monitor your customer relationships
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter the details for the new customer account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Form would go here */}
              <p className="text-center text-muted-foreground">Form would be implemented here</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex w-full items-center space-x-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div>{customer.contact}</div>
                  <div className="text-xs text-muted-foreground">{customer.email}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={customer.status} />
                </TableCell>
                <TableCell>
                  <HealthScoreBadge score={customer.healthScore} />
                </TableCell>
                <TableCell>{customer.lastContact}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[160px]">
                      <div className="grid gap-1">
                        <Button variant="ghost" className="justify-start text-sm">View Details</Button>
                        <Button variant="ghost" className="justify-start text-sm">Edit</Button>
                        <Button variant="ghost" className="justify-start text-sm text-red-500">Delete</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  
  switch (status) {
    case "Active":
      variant = "default";
      break;
    case "At Risk":
      variant = "destructive";
      break;
    case "Inactive":
      variant = "outline";
      break;
  }
  
  return <Badge variant={variant}>{status}</Badge>;
}

function HealthScoreBadge({ score }: { score: number }) {
  let color = "text-green-600";
  
  if (score < 40) {
    color = "text-red-600";
  } else if (score < 70) {
    color = "text-amber-600";
  }
  
  return <span className={`font-medium ${color}`}>{score}%</span>;
} 