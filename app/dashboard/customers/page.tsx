"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building, ChevronRight, Filter, Plus, RefreshCcw, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Customer {
  id: string;
  name: string;
  segment: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "Ativo" | "Em risco" | "Inativo";
  churnScore: number;
  projects: number;
}

interface PageTransitionProps {
  children: React.ReactNode;
}

interface AnimatedElementProps {
  children: React.ReactNode;
  type: "fade" | "slide" | "scale";
  delay?: number;
}

export default function CustomersPage() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    segment: "",
    industry: "",
    status: ""
  });
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    segment: "",
    industry: "",
    status: "active"
  });
  
  useEffect(() => {
    // Simulando o carregamento de dados de clientes
    const timer = setTimeout(() => {
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "Empresa ABC Tecnologia",
          segment: "Enterprise",
          industry: "Tecnologia",
          contactPerson: "Maria Silva",
          email: "contato@abctech.com.br",
          phone: "(11) 3456-7890",
          status: "Ativo",
          churnScore: 15,
          projects: 3,
        },
        {
          id: "2",
          name: "Indústrias XYZ",
          segment: "Corporate",
          industry: "Manufatura",
          contactPerson: "Roberto Oliveira",
          email: "roberto@xyzindustrias.com.br",
          phone: "(21) 2345-6789",
          status: "Em risco",
          churnScore: 62,
          projects: 2,
        },
        {
          id: "3",
          name: "Comércio Rápido Ltda",
          segment: "SMB",
          industry: "Varejo",
          contactPerson: "Fernanda Santos",
          email: "contato@comerciorapido.com.br",
          phone: "(51) 3214-5678",
          status: "Ativo",
          churnScore: 28,
          projects: 1,
        },
        {
          id: "4",
          name: "Saúde Integral",
          segment: "Enterprise",
          industry: "Saúde",
          contactPerson: "Carlos Mendes",
          email: "contato@saudeintegral.com.br",
          phone: "(11) 2233-4455",
          status: "Ativo",
          churnScore: 7,
          projects: 2,
        },
        {
          id: "5",
          name: "Construtora Horizonte",
          segment: "Corporate",
          industry: "Construção",
          contactPerson: "Paulo Rodrigues",
          email: "paulo@horizonteconstrutora.com.br",
          phone: "(31) 3322-1100",
          status: "Inativo",
          churnScore: 95,
          projects: 0,
        },
      ];
      
      setCustomers(mockCustomers);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtragem de clientes com base na busca
  const filteredCustomers = customers.filter((customer: Customer) => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleRefresh = () => {
    setLoading(true);
    // Aqui você pode recarregar os dados dos clientes
    // Por exemplo:
    // fetchCustomers().then(() => setLoading(false));
    setTimeout(() => setLoading(false), 1000); // Simulação
  };

  const handleCreateCustomer = () => {
    // Aqui você pode implementar a criação do cliente
    // Por exemplo:
    // createCustomer(newCustomer).then(() => {
    //   setShowNewCustomerDialog(false);
    //   handleRefresh();
    // });
    setShowNewCustomerDialog(false);
    handleRefresh();
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <AnimatedElement type="fade">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
              <p className="text-muted-foreground">
                Gerencie e acompanhe seus clientes
              </p>
            </div>
            <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Cliente</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="segment">Segmento</Label>
                    <Select
                      value={newCustomer.segment}
                      onValueChange={(value) => setNewCustomer({ ...newCustomer, segment: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="mid-market">Mid-Market</SelectItem>
                        <SelectItem value="smb">SMB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Indústria</Label>
                    <Select
                      value={newCustomer.industry}
                      onValueChange={(value) => setNewCustomer({ ...newCustomer, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a indústria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Tecnologia</SelectItem>
                        <SelectItem value="finance">Finanças</SelectItem>
                        <SelectItem value="healthcare">Saúde</SelectItem>
                        <SelectItem value="retail">Varejo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateCustomer} className="w-full">
                    Criar Cliente
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cliente, segmento, indústria..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filtros</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Segmento</Label>
                      <Select
                        value={filters.segment}
                        onValueChange={(value) => setFilters({ ...filters, segment: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os segmentos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todos</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                          <SelectItem value="mid-market">Mid-Market</SelectItem>
                          <SelectItem value="smb">SMB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Indústria</Label>
                      <Select
                        value={filters.industry}
                        onValueChange={(value) => setFilters({ ...filters, industry: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as indústrias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todas</SelectItem>
                          <SelectItem value="technology">Tecnologia</SelectItem>
                          <SelectItem value="finance">Finanças</SelectItem>
                          <SelectItem value="healthcare">Saúde</SelectItem>
                          <SelectItem value="retail">Varejo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({ ...filters, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todos</SelectItem>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setShowFilters(false)} className="w-full">
                      Aplicar Filtros
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fade" delay={0.2}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Todos os Clientes</CardTitle>
                <CardDescription>
                  Total: {filteredCustomers.length} clientes
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-12 flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">Nenhum cliente encontrado</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCustomers.map((customer, index) => (
                    <Link key={customer.id} href={`/dashboard/customers/${customer.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:border-primary hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-3 mb-3 sm:mb-0">
                          <div className="flex h-10 w-10 rounded-full bg-muted items-center justify-center">
                            <Building className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-base">{customer.name}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span>{customer.industry}</span>
                              <span>•</span>
                              <span>{customer.segment}</span>
                              <span>•</span>
                              <span>{customer.projects} projeto(s)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pl-12 sm:pl-0">
                          <div className="text-sm">
                            <div>{customer.contactPerson}</div>
                            <div className="text-muted-foreground">{customer.email}</div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <StatusBadge status={customer.status} churnScore={customer.churnScore} />
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedElement>
      </div>
    </PageTransition>
  );
}

// Componente auxiliar para renderizar badges de status
function StatusBadge({ status, churnScore }: { status: string; churnScore: number }) {
  let variant: "outline" | "destructive" | "default" | "secondary" = "default";
  let className = "";
  
  switch (status) {
    case "Ativo":
      variant = "outline";
      className = "text-green-600 border-green-600";
      break;
    case "Em risco":
      variant = "secondary";
      className = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      break;
    case "Inativo":
      variant = "destructive";
      break;
  }

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
} 