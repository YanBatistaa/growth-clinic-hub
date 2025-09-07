import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { DailyHuddle } from "@/components/DailyHuddle";
import { CRMKanban } from "@/components/CRMKanban";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Target, Calendar, Clock } from "lucide-react";
import clinicHero from "@/assets/clinic-hero.jpg";

const DashboardOverview = () => (
  <div className="space-y-6">
    {/* Hero Section */}
    <div 
      className="relative h-48 rounded-xl bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${clinicHero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80" />
      <div className="relative z-10 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Bem-vinda, Dra. Ana! 👋</h1>
        <p className="text-lg opacity-90">
          Aqui está o resumo da sua clínica hoje, {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>

    {/* Daily Huddle */}
    <DailyHuddle />

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Leads Ativos
          </CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800">23</div>
          <p className="text-xs text-blue-600">
            +12% em relação à semana passada
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Receita Mensal
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">R$ 45.2k</div>
          <p className="text-xs text-green-600">
            +23% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">
            Taxa de Conversão
          </CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-800">67%</div>
          <p className="text-xs text-purple-600">
            +5% em relação à semana passada
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">
            Agendamentos Hoje
          </CardTitle>
          <Calendar className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-800">8</div>
          <p className="text-xs text-orange-600">
            Próximo às 14:30
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Atividades Recentes
        </CardTitle>
        <CardDescription>
          Acompanhe as últimas movimentações no seu funil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { action: "Lead movido", details: "Maria Silva → Agendado", time: "2 min atrás", type: "move" },
            { action: "Novo lead", details: "João Santos - Botox", time: "15 min atrás", type: "new" },
            { action: "Cliente finalizado", details: "Ana Costa - R$ 2.000", time: "1h atrás", type: "success" },
            { action: "Upsell realizado", details: "Paula Lima - +R$ 800", time: "3h atrás", type: "upsell" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'new' ? 'bg-blue-500' :
                activity.type === 'upsell' ? 'bg-purple-500' :
                'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.details}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activity.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const ScriptsLibrary = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Biblioteca de Scripts</h2>
    <div className="grid gap-6">
      {[
        {
          category: "Primeira Abordagem",
          scripts: [
            "Script de Boas-vindas WhatsApp",
            "E-mail de Apresentação",
            "Ligação de Qualificação"
          ]
        },
        {
          category: "Reativação",
          scripts: [
            "Reativar Lead Frio",
            "Oferta Especial",
            "Urgência de Agendamento"
          ]
        }
      ].map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {category.scripts.map((script) => (
                <div key={script} className="p-3 bg-muted rounded flex justify-between items-center">
                  <span>{script}</span>
                  <Badge>Em breve</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'crm':
        return <CRMKanban />;
      case 'scripts':
        return <ScriptsLibrary />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h3>
              <p className="text-muted-foreground">Esta funcionalidade estará disponível em breve</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}