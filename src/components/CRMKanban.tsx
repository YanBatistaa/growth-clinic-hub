import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Phone, Mail, DollarSign, User } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  procedure: string;
  value: number;
  stage: 'interessado' | 'agendado' | 'cliente' | 'upsell';
}

const procedures = [
  { name: "Botox", value: 800 },
  { name: "Preenchimento", value: 1200 },
  { name: "Harmonização Facial", value: 2000 },
  { name: "Limpeza de Pele", value: 150 },
  { name: "Peeling", value: 300 }
];

const stages = [
  { id: 'interessado', title: 'Interessado', color: 'bg-blue-50 border-blue-200', count: 0 },
  { id: 'agendado', title: 'Agendado', color: 'bg-yellow-50 border-yellow-200', count: 0 },
  { id: 'cliente', title: 'Cliente', color: 'bg-green-50 border-green-200', count: 0 },
  { id: 'upsell', title: 'Upsell Concluído', color: 'bg-purple-50 border-purple-200', count: 0 }
];

export function CRMKanban() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Maria Silva',
      phone: '(11) 99999-9999',
      procedure: 'Botox',
      value: 800,
      stage: 'interessado'
    },
    {
      id: '2', 
      name: 'Ana Costa',
      phone: '(11) 88888-8888',
      procedure: 'Harmonização Facial',
      value: 2000,
      stage: 'agendado'
    },
    {
      id: '3',
      name: 'Julia Santos',
      phone: '(11) 77777-7777',
      procedure: 'Preenchimento',
      value: 1200,
      stage: 'cliente'
    }
  ]);

  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    procedure: '',
    value: 0
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddLead = () => {
    if (newLead.name && newLead.phone && newLead.procedure) {
      const lead: Lead = {
        id: Date.now().toString(),
        name: newLead.name,
        phone: newLead.phone,
        procedure: newLead.procedure,
        value: newLead.value,
        stage: 'interessado'
      };
      
      setLeads([...leads, lead]);
      setNewLead({ name: '', phone: '', procedure: '', value: 0 });
      setIsDialogOpen(false);
    }
  };

  const handleProcedureChange = (procedureName: string) => {
    const procedure = procedures.find(p => p.name === procedureName);
    setNewLead({
      ...newLead,
      procedure: procedureName,
      value: procedure?.value || 0
    });
  };

  const moveToNextStage = (leadId: string) => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        const stageOrder = ['interessado', 'agendado', 'cliente', 'upsell'];
        const currentIndex = stageOrder.indexOf(lead.stage);
        const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
        return { ...lead, stage: nextStage as Lead['stage'] };
      }
      return lead;
    }));
  };

  const getLeadsForStage = (stage: string) => leads.filter(lead => lead.stage === stage);

  const getTotalValueForStage = (stage: string) => {
    return getLeadsForStage(stage).reduce((total, lead) => total + lead.value, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">CRM - Funil de Vendas</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="huddle" className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Lead</DialogTitle>
              <DialogDescription>
                Adicione as informações do novo lead ao seu funil de vendas.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="Ex: Maria Silva"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  placeholder="Ex: (11) 99999-9999"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="procedure">Procedimento de Interesse</Label>
                <Select value={newLead.procedure} onValueChange={handleProcedureChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o procedimento" />
                  </SelectTrigger>
                  <SelectContent>
                    {procedures.map((procedure) => (
                      <SelectItem key={procedure.name} value={procedure.name}>
                        {procedure.name} - R$ {procedure.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Valor do Procedimento</Label>
                <Input
                  id="value"
                  type="number"
                  value={newLead.value}
                  onChange={(e) => setNewLead({ ...newLead, value: Number(e.target.value) })}
                  placeholder="Ex: 800"
                />
              </div>
            </div>
            <Button onClick={handleAddLead} className="w-full">
              Adicionar Lead
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id);
          const stageValue = getTotalValueForStage(stage.id);
          
          return (
            <Card key={stage.id} className={`${stage.color} min-h-[500px]`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {stage.title}
                  <Badge variant="secondary">{stageLeads.length}</Badge>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Total: R$ {stageValue.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {stageLeads.map((lead) => (
                  <Card key={lead.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{lead.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{lead.phone}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-primary">{lead.procedure}</div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-success" />
                            <span className="text-xs font-bold text-success">
                              R$ {lead.value.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        {stage.id !== 'upsell' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moveToNextStage(lead.id)}
                            className="w-full mt-2 text-xs"
                          >
                            Avançar →
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}