"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Search, X, ChevronDown, ChevronUp, Download, FileText, User, MapPin, Tag, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTablePagination } from "@/components/common/table";

const mockVendors = [
  { id: 1, name: "Zaman Heritage", type: "Mughlai", location: "Banani, Dhaka", status: "Pending" },
  { id: 2, name: "Kacchi Bhai Express", type: "Biryani", location: "Dhanmondi", status: "Documents Pending" },
  { id: 3, name: "Spice Garden", type: "Indian", location: "Gulshan, Dhaka", status: "Pending" },
  { id: 4, name: "Sushi Master", type: "Japanese", location: "Baridhara, Dhaka", status: "Approved" },
  { id: 5, name: "Pizza House", type: "Italian", location: "Uttara, Dhaka", status: "Pending" },
  { id: 6, name: "Thai Orchid", type: "Thai", location: "Mohakhali, Dhaka", status: "Documents Pending" },
  { id: 7, name: "Burger King", type: "Fast Food", location: "Mirpur, Dhaka", status: "Approved" },
  { id: 8, name: "Chinese Wok", type: "Chinese", location: "Tejgaon, Dhaka", status: "Pending" },
  { id: 9, name: "Mediterranean Delight", type: "Mediterranean", location: "Banani, Dhaka", status: "Documents Pending" },
  { id: 10, name: "Tandoori Nights", type: "Pakistani", location: "Dhanmondi", status: "Pending" },
  { id: 11, name: "Noodle Bar", type: "Asian", location: "Gulshan, Dhaka", status: "Approved" },
  { id: 12, name: "Steak House", type: "American", location: "Baridhara, Dhaka", status: "Pending" },
  { id: 13, name: "Coffee Shop", type: "Cafe", location: "Uttara, Dhaka", status: "Documents Pending" },
  { id: 14, name: "Ice Cream Parlor", type: "Dessert", location: "Mohakhali, Dhaka", status: "Pending" },
  { id: 15, name: "Bakery Fresh", type: "Bakery", location: "Mirpur, Dhaka", status: "Approved" },
];

const documents = [
  { name: "Trade_License_2024.pdf", size: "2.4 MB", date: "2024-01-15" },
  { name: "Tax_Certificate_2023.pdf", size: "1.8 MB", date: "2024-01-15" },
  { name: "Bank_Statement.pdf", size: "3.2 MB", date: "2024-01-14" },
  { name: "Menu_Catalog.pdf", size: "5.6 MB", date: "2024-01-14" },
  { name: "Health_Certificate.pdf", size: "1.2 MB", date: "2024-01-13" },
];

const PAGE_SIZE = 5;

export function VendorApprovalQueue() {
  const [vendors, setVendors] = useState(mockVendors);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [note, setNote] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleViewDetails = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    if (selectedVendor) {
      const updatedVendors = vendors.map(v =>
        v.id === selectedVendor.id ? { ...v, status: "Approved" } : v
      );
      setVendors(updatedVendors);
      setSelectedVendor({ ...selectedVendor, status: "Approved" });
    }
  };

  const handleReject = () => {
    if (selectedVendor) {
      const updatedVendors = vendors.map(v =>
        v.id === selectedVendor.id ? { ...v, status: "Rejected" } : v
      );
      setVendors(updatedVendors);
      setSelectedVendor({ ...selectedVendor, status: "Rejected" });
    }
  };

  const filteredVendors = vendors
    .filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || v.status === statusFilter;
      const matchesType = typeFilter === "all" || v.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof typeof a] || "";
      const bVal = b[sortField as keyof typeof b] || "";
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const totalItems = filteredVendors.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, totalItems);
  const currentVendors = filteredVendors.slice(start, end);

  const uniqueTypes = [...new Set(vendors.map(v => v.type))];
  const statuses = ["Pending", "Documents Pending", "Approved", "Rejected"];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setCurrentPage(0);
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case "Approved": return "default";
      case "Rejected": return "destructive";
      case "Documents Pending": return "secondary";
      default: return "outline";
    }
  };

  const handleStatusChange = (value: string | null) => {
    setStatusFilter(value || "all");
    setCurrentPage(0);
  };

  const handleTypeChange = (value: string | null) => {
    setTypeFilter(value || "all");
    setCurrentPage(0);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vendor Approval Queue</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {uniqueTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && (
          <Button variant="ghost" onClick={handleClearFilters} className="gap-2">
            <X className="h-4 w-4" /> Clear Filters
          </Button>
        )}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Name
                    {sortField === "name" && (
                      sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button
                    onClick={() => handleSort("type")}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Type
                    {sortField === "type" && (
                      sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button
                    onClick={() => handleSort("location")}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Location
                    {sortField === "location" && (
                      sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Status
                    {sortField === "status" && (
                      sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVendors.map((vendor) => (
                <tr key={vendor.id} className="border-t hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{vendor.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{vendor.type}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{vendor.location}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(vendor)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVendors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No vendors found
            </div>
          )}
        </div>

        {filteredVendors.length > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            start={start}
            end={end}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        )}
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Vendor Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-6 pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                    {getInitials(selectedVendor.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      <span>{selectedVendor.type}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <MapPin className="h-3 w-3" />
                      <span>{selectedVendor.location}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusVariant(selectedVendor.status)} className="text-sm px-4 py-1.5">
                  {selectedVendor.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Application Date</p>
                  <p className="font-semibold">2024-01-15</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Documents</p>
                  <p className="font-semibold">{documents.length} files</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Review Status</p>
                  <p className="font-semibold">In Progress</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Submitted Documents
                  </h5>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-3 w-3" /> Download All
                  </Button>
                </div>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-3 flex justify-between items-center hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Administrator Note
                </h5>
                <textarea
                  className="w-full border rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Add a private note for other administrators..."
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={handleReject}
                  disabled={selectedVendor.status === "Rejected" || selectedVendor.status === "Approved"}
                >
                  <X className="h-4 w-4" /> Reject Application
                </Button>
                <Button
                  className="flex-1 bg-black text-white hover:bg-gray-800 gap-2"
                  onClick={handleApprove}
                  disabled={selectedVendor.status === "Approved" || selectedVendor.status === "Rejected"}
                >
                  <Clock className="h-4 w-4" /> Approve Vendor
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}