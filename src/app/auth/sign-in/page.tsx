"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Checkbox } from "@/components/ui/Input";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      if (email === "demo@prixjuste.ci" && password === "demo123") {
        window.location.href = "/";
      } else {
        setError("Email ou mot de passe incorrect");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2A44] via-[#1F3A5F] to-[#0F2A44] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"><span className="text-[#0F2A44] font-bold text-2xl">P</span></div>
          <span className="text-2xl font-bold text-white">PrixJuste</span>
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-500 mt-2">Accédez à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
            <Input label="Email" type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail size={18} />} required />
            <Input label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock size={18} />} required />
            <div className="flex items-center justify-between">
              <Checkbox label="Se souvenir de moi" />
              <Link href="#" className="text-sm text-[#0F2A44] hover:underline">Mot de passe oublié ?</Link>
            </div>
            <Button type="submit" fullWidth isLoading={isLoading} rightIcon={<ArrowRight size={18} />}>Se connecter</Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Pas encore de compte ? <Link href="/auth/sign-up" className="text-[#0F2A44] font-medium hover:underline">Créer un compte</Link></p>
          </div>

          <div className="mt-6 p-4 bg-[#0F2A44]/5 rounded-xl">
            <p className="text-xs text-gray-500 text-center mb-2">Compte démo :</p>
            <p className="text-xs font-mono text-center text-gray-700">demo@prixjuste.ci / demo123</p>
          </div>
        </Card>

        <p className="text-center text-white/60 text-sm mt-8">© 2025 PrixJuste. Tous droits réservés.</p>
      </div>
    </div>
  );
}
