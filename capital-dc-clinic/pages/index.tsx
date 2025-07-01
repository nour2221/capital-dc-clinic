
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function DentalClinicDashboard() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [treatments, setTreatments] = useState([
    { name: "", price: "" },
    { name: "", price: "" },
  ]);

  const t = (en, ar) => (language === "en" ? en : ar);

  const handleTreatmentChange = (index, field, value) => {
    const updated = [...treatments];
    updated[index][field] = value;
    setTreatments(updated);
  };

  const addTreatment = () => {
    setTreatments([...treatments, { name: "", price: "" }]);
  };

  return (
    <div
      className={\`min-h-screen p-10 \${theme === "dark"
          ? "bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#111] text-gray-100"
          : "bg-white text-gray-900"
        } font-serif tracking-wide\`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-widest text-[#FFD700] font-serif drop-shadow-md uppercase">
          Capital DC
        </h1>
        <div className="flex flex-col items-end gap-2">
          <select
            className="bg-[#2a2a2a] text-white text-sm px-2 py-1 rounded-lg shadow-inner border border-[#444]"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
          <select
            className="bg-[#2a2a2a] text-white text-sm px-2 py-1 rounded-lg shadow-inner border border-[#444]"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="bg-[#1a1a1a] text-[#FFD700] rounded-2xl shadow-lg ring-1 ring-[#333] overflow-hidden">
          <TabsTrigger value="dashboard">{t("Dashboard", "لوحة التحكم")}</TabsTrigger>
          <TabsTrigger value="patients">{t("Patients", "المرضى")}</TabsTrigger>
          <TabsTrigger value="appointments">{t("Appointments", "المواعيد")}</TabsTrigger>
          <TabsTrigger value="charting">{t("Charting", "الرسم البياني")}</TabsTrigger>
          <TabsTrigger value="billing">{t("Billing", "الفواتير")}</TabsTrigger>
          <TabsTrigger value="inventory">{t("Inventory", "المخزون")}</TabsTrigger>
          <TabsTrigger value="reports">{t("Reports", "التقارير")}</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card className="bg-[#161616] border border-[#333] shadow-xl rounded-3xl backdrop-blur-md">
            <CardContent className="p-4">
              <p>{t("Welcome back! Here's your overview for today.", "مرحبًا بعودتك! إليك نظرة عامة على اليوم.")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card className="bg-[#161616] border border-[#333] shadow-xl rounded-3xl">
            <CardContent className="p-4 space-y-4">
              <Input placeholder={t("Search patients...", "ابحث عن المرضى...")} className="bg-[#1e1e1e] text-white rounded-xl border border-[#444] focus:ring-2 focus:ring-[#FFD700]" />
              <Input placeholder={t("Full Name", "الاسم الكامل")} className="bg-[#1e1e1e] text-white rounded-xl border border-[#444] focus:ring-2 focus:ring-[#FFD700]" />
              <Input placeholder={t("Phone Number", "رقم الهاتف")} className="bg-[#1e1e1e] text-white rounded-xl border border-[#444] focus:ring-2 focus:ring-[#FFD700]" />
              <Textarea placeholder={t("Medical History", "التاريخ الطبي")} className="bg-[#1e1e1e] text-white rounded-xl border border-[#444] focus:ring-2 focus:ring-[#FFD700]" />
              <Button className="bg-[#FFD700] text-black font-medium rounded-xl shadow-md hover:brightness-110 transition-all">
                {t("Add Patient", "إضافة مريض")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="bg-[#161616] border border-[#333] shadow-xl rounded-3xl">
            <CardContent className="p-4">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="bg-[#1e1e1e] text-white rounded-xl border border-[#444]" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="bg-[#161616] border border-[#333] shadow-xl rounded-3xl">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder={t("Patient Name", "اسم المريض")} className="bg-[#1e1e1e] text-white" />
                <Input placeholder={t("Date", "التاريخ")} type="date" className="bg-[#1e1e1e] text-white" />
              </div>
              <div className="space-y-2">
                {treatments.map((treatment, index) => (
                  <div key={`treatment-${index}`} className="grid grid-cols-2 gap-2">
                    <Input placeholder={t("Treatment Name", "اسم العلاج")} className="bg-[#1e1e1e] text-white" value={treatment.name} onChange={(e) => handleTreatmentChange(index, "name", e.target.value)} />
                    <Input placeholder={t("Price (EGP)", "السعر (ج.م)")} className="bg-[#1e1e1e] text-white" value={treatment.price} onChange={(e) => handleTreatmentChange(index, "price", e.target.value)} />
                  </div>
                ))}
                <Button onClick={addTreatment} className="bg-[#FFD700] text-black font-medium rounded-xl shadow-md hover:brightness-110 transition-all">
                  +
                </Button>
              </div>
              <Input placeholder={t("Total Amount (EGP)", "المبلغ الإجمالي (ج.م)")} className="bg-[#1e1e1e] text-white" />
              <Button className="bg-[#FFD700] text-black font-medium rounded-xl shadow-md hover:brightness-110 transition-all">
                {t("Generate Invoice", "إنشاء فاتورة")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
