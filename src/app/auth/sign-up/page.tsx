"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Checkbox } from "@/components/ui/Input";
import { Mail, Lock, User, Phone, ArrowRight, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { window.location.href = "/"; }, 1500);
  };

  const benefits = ["Accès illimité au catalogue des prix", "Génération de devis intelligents", "Alertes de variation des prix", "Support prioritaire"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block text-white">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"><span className="text-[#0F2A44] font-bold text-2xl">P</span></div>
            <span className="text-2xl font-bold">PrixJuste</span>
          </Link>
          <h2 className="text-3xl font-bold mb-4">Rejoignez des milliers d'utilisateurs</h2>
          <p className="text-white/70 mb-8">Créez votre compte gratuitement et commencez à économiser.</p>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle size={14} className="text-green-400" /></div>
                <span className="text-white/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="p-8">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#0F2A44] rounded-xl flex items-center justify-center"><span className="text-white font-bold text-xl">P</span></div>
            <span className="text-xl font-bold text-[#0F2A44]">PrixJuste</span>
          </div>
          <div className="text-center mb-6"><h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1><p className="text-gray-500 mt-1">C'est gratuit et rapide</p></div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nom complet" name="name" placeholder="Jean Kouadio" value={formData.name} onChange={handleChange} leftIcon={<User size={18} />} required />
            <Input label="Email" name="email" type="email" placeholder="jean@exemple.com" value={formData.email} onChange={handleChange} leftIcon={<Mail size={18} />} required />
            <Input label="Téléphone (optionnel)" name="phone" type="tel" placeholder="+225 07 00 00 00 00" value={formData.phone} onChange={handleChange} leftIcon={<Phone size={18} />} />
            <Input label="Mot de passe" name="password" type="password" placeholder="Minimum 6 caractères" value={formData.password} onChange={handleChange} leftIcon={<Lock size={18} />} required />
            <Input label="Confirmer" name="confirmPassword" type="password" placeholder="Confirmez le mot de passe" value={formData.confirmPassword} onChange={handleChange} leftIcon={<Lock size={18} />} required />
            <Checkbox label="J'accepte les conditions d'utilisation" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
            <Button type="submit" fullWidth isLoading={isLoading} rightIcon={<ArrowRight size={18} />}>Créer mon compte</Button>
          </form>

          <div className="mt-6 text-center"><p className="text-sm text-gray-500">Déjà un compte ? <Link href="/auth/sign-in" className="text-[#0F2A44] font-medium hover:underline">Se connecter</Link></p></div>
        </Card>
      </div>
    </div>
  );
}
