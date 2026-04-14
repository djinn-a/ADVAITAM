import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  useListLeads,
  useGetLeadStats,
  useUpdateLead,
  useDeleteLead,
  getListLeadsQueryKey,
  getGetLeadStatsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  TrendingUp,
  UserCheck,
  UserX,
  Trees,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function Admin() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);

  const [editStatus, setEditStatus] = useState<string>("new");
  const [editNotes, setEditNotes] = useState<string>("");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (sourceFilter !== "all") params.source = sourceFilter;
    return params;
  }, [statusFilter, sourceFilter]);

  const { data: stats, isLoading: isLoadingStats } = useGetLeadStats({
    query: { queryKey: getGetLeadStatsQueryKey() },
  });

  const { data: leads, isLoading: isLoadingLeads } = useListLeads(queryParams, {
    query: { queryKey: getListLeadsQueryKey(queryParams) },
  });

  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const filteredLeads = useMemo(() => {
    if (!Array.isArray(leads)) return [];
    if (!searchQuery) return leads;
    const lowerQuery = searchQuery.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(lowerQuery) ||
        lead.phone.includes(lowerQuery) ||
        (lead.email && lead.email.toLowerCase().includes(lowerQuery)),
    );
  }, [leads, searchQuery]);

  const handleEditClick = (lead: any) => {
    setSelectedLeadId(lead.id);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedLeadId) return;
    updateLead.mutate(
      {
        id: selectedLeadId,
        data: { status: editStatus, notes: editNotes },
      },
      {
        onSuccess: () => {
          toast({ title: "Lead updated successfully" });
          setIsEditModalOpen(false);
          queryClient.invalidateQueries({
            queryKey: getListLeadsQueryKey(queryParams),
          });
          queryClient.invalidateQueries({
            queryKey: getGetLeadStatsQueryKey(),
          });
        },
        onError: (error) => {
          toast({
            title: "Failed to update lead",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!leadToDelete) return;
    deleteLead.mutate(
      { id: leadToDelete },
      {
        onSuccess: () => {
          toast({ title: "Lead deleted successfully" });
          setIsDeleteAlertOpen(false);
          setLeadToDelete(null);
          queryClient.invalidateQueries({
            queryKey: getListLeadsQueryKey(queryParams),
          });
          queryClient.invalidateQueries({
            queryKey: getGetLeadStatsQueryKey(),
          });
        },
        onError: (error) => {
          toast({
            title: "Failed to delete lead",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
            New
          </Badge>
        );
      case "contacted":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">
            Contacted
          </Badge>
        );
      case "qualified":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
            Qualified
          </Badge>
        );
      case "lost":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">
            Lost
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "brochure":
        return (
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-400 border-purple-500/20"
          >
            Brochure
          </Badge>
        );
      case "site-visit":
        return (
          <Badge
            variant="outline"
            className="bg-teal-500/10 text-teal-400 border-teal-500/20"
          >
            Site Visit
          </Badge>
        );
      case "whatsapp":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-400 border-green-500/20"
          >
            WhatsApp
          </Badge>
        );
      case "exit-popup":
        return (
          <Badge
            variant="outline"
            className="bg-orange-500/10 text-orange-400 border-orange-500/20"
          >
            Exit Popup
          </Badge>
        );
      default:
        return <Badge variant="outline">{source}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Trees className="w-5 h-5 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold tracking-wide">
              ADVAITAM SALES
            </span>
          </div>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Leads
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-3xl font-bold">{stats?.total || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New Today
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-3xl font-bold text-primary">
                  {stats?.newToday || 0}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Qualified
              </CardTitle>
              <UserCheck className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-3xl font-bold text-green-500">
                  {stats?.byStatus?.qualified || 0}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Lost
              </CardTitle>
              <UserX className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-3xl font-bold text-red-500">
                  {stats?.byStatus?.lost || 0}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leads Table Section */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-lg font-bold font-serif">Lead Pipeline</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9 w-full sm:w-64 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-background">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="brochure">Brochure</SelectItem>
                  <SelectItem value="site-visit">Site Visit</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="exit-popup">Exit Popup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="w-[200px] text-muted-foreground font-medium">
                    Contact
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    Details
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    Source
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    Date
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground font-medium">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingLeads ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-border">
                      <TableCell>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredLeads.length === 0 ? (
                  <TableRow className="border-border hover:bg-transparent">
                    <TableCell
                      colSpan={6}
                      className="h-48 text-center text-muted-foreground"
                    >
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="border-border hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => handleEditClick(lead)}
                    >
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {lead.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.email ? (
                          <div className="text-sm flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                            {lead.email}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            No email
                          </span>
                        )}
                        {lead.notes && (
                          <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px] flex items-center gap-1.5">
                            <MessageSquare className="w-3 h-3 shrink-0" />{" "}
                            {lead.notes}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getSourceBadge(lead.source)}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(lead.createdAt), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px]"
                          >
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(lead);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500 focus:bg-red-500/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLeadToDelete(lead.id);
                                setIsDeleteAlertOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Lead Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sales Notes</label>
              <Textarea
                placeholder="Enter details from your call or meeting..."
                className="min-h-[120px] resize-none"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={updateLead.isPending}>
              {updateLead.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              lead from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
              disabled={deleteLead.isPending}
            >
              {deleteLead.isPending ? "Deleting..." : "Delete Lead"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
