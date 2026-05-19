"use client"

import style from "./style.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassInput, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GetAllForm } from "@/lib/formdata";
import { signIn } from "@/models/User";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface Signinprops {
  email: string
  password: string
}

function DashboardSignIn() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isErrorOpen, setIsErrorOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const FormData = GetAllForm<Signinprops>(e);

    signIn(FormData.email, FormData.password).then((role) => {
      const callback = (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('callback') : null) || "/dashboard"
      location.replace(callback);
    }).catch((err) => {
      setIsLoading(false);
      setError(err.message || "Parola sau/ori email-ul este gresit");
      setIsErrorOpen(true);
    });
  };

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] justify-center min-h-screen glass-bg">
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="flex items-center justify-center py-12 relative z-10">
        <div className="mx-auto grid w-[350px] gap-6 glass-card p-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-white">Conectează-te</h1>
            <p className="text-balance text-blue-100">
              Introduceți adresa de e-mail mai jos pentru a vă conecta la contul dvs
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-blue-100 font-semibold">Email</Label>
              <GlassInput
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-blue-100 font-semibold">Parolă</Label>
                <Link href="/account/signin" className="ml-auto inline-block text-sm underline text-blue-300 hover:text-blue-100">
                  Ai uitat parola?
                </Link>
              </div>
              <GlassInput
                id="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se conectează...
                </>
              ) : (
                "Conectează-te"
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative z-5">
        <Image
          src="/login.jpg"
          alt="Image"
          width="1920"
          height="680"
          className="h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>

      <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
        <DialogContent className="glass-card border-white/20 bg-white/10 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-white">Eroare de autentificare</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-blue-100 font-semibold">
            {error}
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => setIsErrorOpen(false)}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Încearcă din nou
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default DashboardSignIn;
