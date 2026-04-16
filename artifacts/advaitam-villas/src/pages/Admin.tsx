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
  ImageIcon,
  Upload,
  Plus,
  Layout,
  Type,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetSiteSettings,
  useUpdateSiteSettings,
  getGetSiteSettingsQueryKey,
} from "@workspace/api-client-react";

// Section Editor Component
interface SectionEditorProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isLoading: boolean;
  imageUrl?: string;
  onImageUpload?: (file: File) => void;
  uploading?: boolean;
}

function SectionEditor({
  title,
  icon,
  children,
  isLoading,
  imageUrl,
  onImageUpload,
  uploading,
}: SectionEditorProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-serif flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <>
            {onImageUpload && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Section Image
                </label>
                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-secondary/30">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Upload className="w-4 h-4 mr-1 animate-pulse" />{" "}
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-1" /> Upload Image
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Max 5MB. JPEG, PNG, or WebP.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {children}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("leads");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);

  const [editStatus, setEditStatus] = useState<string>("new");
  const [editNotes, setEditNotes] = useState<string>("");

  // Site Settings State
  const [settingsForm, setSettingsForm] = useState({
    whatsapp_phone: "",
    contact_email: "",
    current_availability: "",
    discount_pricing: "",
    discount_exit_intent: "",
    base_price: "",
    location_advantages: [""],
    pdf_google_drive_link: "",
    // Hero Section
    hero_badge_text: "",
    hero_heading: "",
    hero_subheading: "",
    hero_cta_primary: "",
    hero_cta_secondary: "",
    hero_image_url: "",
    // Features Section
    features_heading: "",
    features_description: "",
    features_list: [""],
    features_image_url: "",
    // Immersion Section
    immersion_heading: "",
    immersion_description: "",
    immersion_advantages_heading: "",
    immersion_quote: "",
    immersion_image_url: "",
    // Investment Section
    investment_heading: "",
    investment_description: "",
    investment_features: [""],
    investment_cta: "",
    investment_image_url: "",
    // Pricing Section
    pricing_heading: "",
    pricing_subheading: "",
    // Footer
    footer_tagline: "",
  });

  // Image upload state
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);

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

  // Site Settings Hooks
  const { data: settings, isLoading: isLoadingSettings } = useGetSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  // Load settings into form when data arrives
  useMemo(() => {
    if (settings) {
      setSettingsForm({
        whatsapp_phone: settings.whatsapp_phone || "",
        contact_email: settings.contact_email || "",
        current_availability: settings.current_availability || "",
        discount_pricing: settings.discount_pricing || "",
        discount_exit_intent: settings.discount_exit_intent || "",
        base_price: settings.base_price || "",
        location_advantages: settings.location_advantages || [""],
        pdf_google_drive_link: settings.pdf_google_drive_link || "",
        // Hero Section
        hero_badge_text: settings.hero_badge_text || "",
        hero_heading: settings.hero_heading || "",
        hero_subheading: settings.hero_subheading || "",
        hero_cta_primary: settings.hero_cta_primary || "",
        hero_cta_secondary: settings.hero_cta_secondary || "",
        hero_image_url: settings.hero_image_url || "",
        // Features Section
        features_heading: settings.features_heading || "",
        features_description: settings.features_description || "",
        features_list: settings.features_list || [""],
        features_image_url: settings.features_image_url || "",
        // Immersion Section
        immersion_heading: settings.immersion_heading || "",
        immersion_description: settings.immersion_description || "",
        immersion_advantages_heading:
          settings.immersion_advantages_heading || "",
        immersion_quote: settings.immersion_quote || "",
        immersion_image_url: settings.immersion_image_url || "",
        // Investment Section
        investment_heading: settings.investment_heading || "",
        investment_description: settings.investment_description || "",
        investment_features: settings.investment_features || [""],
        investment_cta: settings.investment_cta || "",
        investment_image_url: settings.investment_image_url || "",
        // Pricing Section
        pricing_heading: settings.pricing_heading || "",
        pricing_subheading: settings.pricing_subheading || "",
        // Footer
        footer_tagline: settings.footer_tagline || "",
      });
    }
  }, [settings]);

  const handleSettingsSave = () => {
    updateSettings.mutate(
      { data: settingsForm },
      {
        onSuccess: () => {
          toast({ title: "Settings saved successfully" });
          queryClient.invalidateQueries({
            queryKey: getGetSiteSettingsQueryKey(),
          });
        },
        onError: (error: { message: string }) => {
          toast({
            title: "Failed to save settings",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleImageUpload = async (section: string, file: File) => {
    setUploadingSection(section);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("section", section);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const result = await response.json();

      // Update the form with the new image URL
      setSettingsForm((prev) => ({
        ...prev,
        [`${section}_image_url`]: result.url,
      }));

      toast({
        title: "Image uploaded successfully",
        description: "The image has been uploaded to Supabase.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setUploadingSection(null);
    }
  };

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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="leads">Lead Pipeline</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-8">
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
                    <div className="text-3xl font-bold">
                      {stats?.total || 0}
                    </div>
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
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  Lead
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
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <SectionEditor
              title="Hero Section"
              icon={<Layout className="w-5 h-5" />}
              isLoading={isLoadingSettings}
              imageUrl={settingsForm.hero_image_url}
              onImageUpload={(file) => handleImageUpload("hero", file)}
              uploading={uploadingSection === "hero"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Badge Text
                  </label>
                  <Input
                    value={settingsForm.hero_badge_text}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        hero_badge_text: e.target.value,
                      })
                    }
                    placeholder="Limited Inventory • High ROI Potential"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Main Heading
                  </label>
                  <Textarea
                    value={settingsForm.hero_heading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        hero_heading: e.target.value,
                      })
                    }
                    placeholder="Own a Private Forest Villa in Jim Corbett"
                    className="bg-background min-h-[60px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Subheading
                  </label>
                  <Textarea
                    value={settingsForm.hero_subheading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        hero_subheading: e.target.value,
                      })
                    }
                    placeholder="Only 17 Ultra-Luxury Villas..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary CTA</label>
                  <Input
                    value={settingsForm.hero_cta_primary}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        hero_cta_primary: e.target.value,
                      })
                    }
                    placeholder="Get Brochure"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Secondary CTA</label>
                  <Input
                    value={settingsForm.hero_cta_secondary}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        hero_cta_secondary: e.target.value,
                      })
                    }
                    placeholder="Book Site Visit"
                    className="bg-background"
                  />
                </div>
              </div>
            </SectionEditor>

            <SectionEditor
              title="Features Section"
              icon={<Layout className="w-5 h-5" />}
              isLoading={isLoadingSettings}
              imageUrl={settingsForm.features_image_url}
              onImageUpload={(file) => handleImageUpload("features", file)}
              uploading={uploadingSection === "features"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Heading
                  </label>
                  <Input
                    value={settingsForm.features_heading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        features_heading: e.target.value,
                      })
                    }
                    placeholder="The Definition of Exclusive"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Description
                  </label>
                  <Textarea
                    value={settingsForm.features_description}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        features_description: e.target.value,
                      })
                    }
                    placeholder="Advaitam is not a resort..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Feature List</label>
                  {settingsForm.features_list.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newList = [...settingsForm.features_list];
                          newList[index] = e.target.value;
                          setSettingsForm({
                            ...settingsForm,
                            features_list: newList,
                          });
                        }}
                        placeholder={`Feature ${index + 1}`}
                        className="bg-background"
                      />
                      {settingsForm.features_list.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newList = settingsForm.features_list.filter(
                              (_, i) => i !== index,
                            );
                            setSettingsForm({
                              ...settingsForm,
                              features_list:
                                newList.length > 0 ? newList : [""],
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSettingsForm({
                        ...settingsForm,
                        features_list: [...settingsForm.features_list, ""],
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Feature
                  </Button>
                </div>
              </div>
            </SectionEditor>

            <SectionEditor
              title="Immersion Section"
              icon={<Layout className="w-5 h-5" />}
              isLoading={isLoadingSettings}
              imageUrl={settingsForm.immersion_image_url}
              onImageUpload={(file) => handleImageUpload("immersion", file)}
              uploading={uploadingSection === "immersion"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Heading
                  </label>
                  <Input
                    value={settingsForm.immersion_heading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        immersion_heading: e.target.value,
                      })
                    }
                    placeholder="Where the Forest Meets the Firelight"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Description
                  </label>
                  <Textarea
                    value={settingsForm.immersion_description}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        immersion_description: e.target.value,
                      })
                    }
                    placeholder="Floor-to-ceiling glass erases the boundary..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Advantages Heading
                  </label>
                  <Input
                    value={settingsForm.immersion_advantages_heading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        immersion_advantages_heading: e.target.value,
                      })
                    }
                    placeholder="Location Advantages"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quote Text</label>
                  <Input
                    value={settingsForm.immersion_quote}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        immersion_quote: e.target.value,
                      })
                    }
                    placeholder='"Close enough for convenience..."'
                    className="bg-background"
                  />
                </div>
              </div>
            </SectionEditor>

            <SectionEditor
              title="Investment Section"
              icon={<Layout className="w-5 h-5" />}
              isLoading={isLoadingSettings}
              imageUrl={settingsForm.investment_image_url}
              onImageUpload={(file) => handleImageUpload("investment", file)}
              uploading={uploadingSection === "investment"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Heading
                  </label>
                  <Input
                    value={settingsForm.investment_heading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        investment_heading: e.target.value,
                      })
                    }
                    placeholder="A Legacy Investment"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Description
                  </label>
                  <Textarea
                    value={settingsForm.investment_description}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        investment_description: e.target.value,
                      })
                    }
                    placeholder="Beyond a weekend escape..."
                    className="bg-background min-h-[80px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">
                    Investment Features
                  </label>
                  {settingsForm.investment_features.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newList = [...settingsForm.investment_features];
                          newList[index] = e.target.value;
                          setSettingsForm({
                            ...settingsForm,
                            investment_features: newList,
                          });
                        }}
                        placeholder={`Feature ${index + 1}`}
                        className="bg-background"
                      />
                      {settingsForm.investment_features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newList =
                              settingsForm.investment_features.filter(
                                (_, i) => i !== index,
                              );
                            setSettingsForm({
                              ...settingsForm,
                              investment_features:
                                newList.length > 0 ? newList : [""],
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSettingsForm({
                        ...settingsForm,
                        investment_features: [
                          ...settingsForm.investment_features,
                          "",
                        ],
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CTA Text</label>
                  <Input
                    value={settingsForm.investment_cta}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        investment_cta: e.target.value,
                      })
                    }
                    placeholder="Get Rental Income Projection"
                    className="bg-background"
                  />
                </div>
              </div>
            </SectionEditor>

            <SectionEditor
              title="Pricing Section"
              icon={<Layout className="w-5 h-5" />}
              isLoading={isLoadingSettings}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Heading
                  </label>
                  <Input
                    value={settingsForm.pricing_heading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        pricing_heading: e.target.value,
                      })
                    }
                    placeholder="Claim Your Sanctuary"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Subheading
                  </label>
                  <Input
                    value={settingsForm.pricing_subheading}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        pricing_subheading: e.target.value,
                      })
                    }
                    placeholder="Only 17 Villas. Once Sold, Gone Forever."
                    className="bg-background"
                  />
                </div>
              </div>
            </SectionEditor>

            <SectionEditor
              title="Footer"
              icon={<Layout className="w-5 h-5" />}
              isLoading={isLoadingSettings}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" /> Tagline
                  </label>
                  <Input
                    value={settingsForm.footer_tagline}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        footer_tagline: e.target.value,
                      })
                    }
                    placeholder="Luxury Forest Villas in Jim Corbett."
                    className="bg-background"
                  />
                </div>
              </div>
            </SectionEditor>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSettingsSave}
                disabled={updateSettings.isPending}
                size="lg"
              >
                {updateSettings.isPending ? "Saving..." : "Save All Changes"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-serif">
                  Site Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingSettings ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          WhatsApp Phone Number
                        </label>
                        <Input
                          value={settingsForm.whatsapp_phone}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              whatsapp_phone: e.target.value,
                            })
                          }
                          placeholder="919217567788"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Format: country code + number (no + or spaces)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Contact Email
                        </label>
                        <Input
                          value={settingsForm.contact_email}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              contact_email: e.target.value,
                            })
                          }
                          placeholder="info@advaitamvillas.com"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Current Availability
                        </label>
                        <Input
                          value={settingsForm.current_availability}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              current_availability: e.target.value,
                            })
                          }
                          placeholder="9"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Number of villas currently available (0-17)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Discount (Pricing Section)
                        </label>
                        <Input
                          value={settingsForm.discount_pricing}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              discount_pricing: e.target.value,
                            })
                          }
                          placeholder="15"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Discount amount in Lakhs (e.g., 15)
                        </p>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Discount (Exit Intent Popup)
                        </label>
                        <Input
                          value={settingsForm.discount_exit_intent}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              discount_exit_intent: e.target.value,
                            })
                          }
                          placeholder="15L"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Text shown in exit intent popup (e.g., 15L or ₹15L
                          Discount)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Base Price (in Crores)
                        </label>
                        <Input
                          value={settingsForm.base_price}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              base_price: e.target.value,
                            })
                          }
                          placeholder="1.50"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Base price in Crores (e.g., 1.50)
                        </p>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Location Advantages
                        </label>
                        <div className="space-y-2">
                          {settingsForm.location_advantages.map(
                            (advantage, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={advantage}
                                  onChange={(e) => {
                                    const newAdvantages = [
                                      ...settingsForm.location_advantages,
                                    ];
                                    newAdvantages[index] = e.target.value;
                                    setSettingsForm({
                                      ...settingsForm,
                                      location_advantages: newAdvantages,
                                    });
                                  }}
                                  placeholder={`Location advantage ${index + 1}`}
                                  className="bg-background"
                                />
                                {settingsForm.location_advantages.length >
                                  1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                      const newAdvantages =
                                        settingsForm.location_advantages.filter(
                                          (_, i) => i !== index,
                                        );
                                      setSettingsForm({
                                        ...settingsForm,
                                        location_advantages:
                                          newAdvantages.length > 0
                                            ? newAdvantages
                                            : [""],
                                      });
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ),
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setSettingsForm({
                                ...settingsForm,
                                location_advantages: [
                                  ...settingsForm.location_advantages,
                                  "",
                                ],
                              })
                            }
                          >
                            Add Location Advantage
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Add multiple location advantages that will be
                          displayed on the home page
                        </p>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          PDF Brochure Google Drive Link
                        </label>
                        <Input
                          value={settingsForm.pdf_google_drive_link}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              pdf_google_drive_link: e.target.value,
                            })
                          }
                          placeholder="https://drive.google.com/file/d/.../view"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Google Drive link to the PDF brochure. Make sure the
                          link is publicly accessible.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={handleSettingsSave}
                        disabled={updateSettings.isPending}
                      >
                        {updateSettings.isPending
                          ? "Saving..."
                          : "Save Settings"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
