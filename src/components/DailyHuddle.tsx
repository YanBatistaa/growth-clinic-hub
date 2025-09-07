import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, Target, HelpCircle, Calendar, DollarSign, Users } from "lucide-react";

interface DailyHuddleProps {
  yesterdayLeads?: number;
  yesterdayRevenue?: number;
  todayTarget?: number;
  targetStage?: string;
}

export function DailyHuddle({ 
  yesterdayLeads = 12, 
  yesterdayRevenue = 3400, 
  todayTarget = 8,
  targetStage = "Interessado para Agendado"
}: DailyHuddleProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const quickScript = `Olá, [Nome]! Notei que você demonstrou interesse no nosso [Procedimento]. 

Temos uma oportunidade especial hoje para você conhecer melhor nossos resultados. 

Que tal agendarmos uma consulta para conversarmos sobre seus objetivos?

Tenho um horário hoje às [Horário]. Posso separar para você?`;

  return (
    <Card className="w-full border-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6" />
          Pulseiro Diário
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Sua dose diária de clareza e direção
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Botão 1: Números de Ontem */}
          <Dialog open={openModal === "yesterday"} onOpenChange={(open) => setOpenModal(open ? "yesterday" : null)}>
            <DialogTrigger asChild>
              <Button 
                variant="huddle" 
                size="xl" 
                className="h-20 flex-col gap-2 text-left w-full"
              >
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm font-medium">Qual foi meu</span>
                <span className="text-lg font-bold">número de ontem?</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-success">
                  ✅ Seu resultado de ontem
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-success-light p-4 rounded-lg">
                  <p className="text-lg">
                    Você avançou <span className="font-bold text-success">{yesterdayLeads} leads</span> na sua esteira e gerou{" "}
                    <span className="font-bold text-success">R$ {yesterdayRevenue.toLocaleString()}</span> em valor de procedimentos agendados.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">{yesterdayLeads}</div>
                    <div className="text-sm text-muted-foreground">Leads Avançados</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold text-success">R$ {yesterdayRevenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Receita Gerada</div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Botão 2: Meta de Hoje */}
          <Dialog open={openModal === "today"} onOpenChange={(open) => setOpenModal(open ? "today" : null)}>
            <DialogTrigger asChild>
              <Button 
                variant="accent" 
                size="xl" 
                className="h-20 flex-col gap-2 text-left w-full"
              >
                <Target className="h-6 w-6" />
                <span className="text-sm font-medium">Qual é a minha</span>
                <span className="text-lg font-bold">meta de hoje?</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-accent">
                  🎯 Sua meta para hoje
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <p className="text-lg">
                    Com base no seu funil, foque em mover <span className="font-bold text-accent">{todayTarget} leads</span> do estágio{" "}
                    <span className="font-bold">'{targetStage}'</span>.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">💡 Dica estratégica:</h4>
                  <p className="text-sm text-muted-foreground">
                    Este é o maior gargalo do seu funil atual. Foque sua energia aqui para maximizar resultados.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Botão 3: Ajuda Rápida */}
          <Dialog open={openModal === "help"} onOpenChange={(open) => setOpenModal(open ? "help" : null)}>
            <DialogTrigger asChild>
              <Button 
                variant="warning" 
                size="xl" 
                className="h-20 flex-col gap-2 text-left w-full"
              >
                <HelpCircle className="h-6 w-6" />
                <span className="text-sm font-medium">Preciso de uma</span>
                <span className="text-lg font-bold">ajuda rápida</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-warning">
                  🆘 Aqui está uma solução rápida
                </DialogTitle>
                <DialogDescription>
                  Script de Reativação - Ideal para leads parados em "Interessado"
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-warning-light p-4 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{quickScript}</pre>
                </div>
                <Button 
                  onClick={() => navigator.clipboard.writeText(quickScript)}
                  className="w-full"
                  variant="outline"
                >
                  📋 Copiar Script
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}