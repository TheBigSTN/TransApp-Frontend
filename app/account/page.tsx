"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserdetails, updateuserpassword } from "@/models/User"
import { useEffect, useState } from "react"
import useSwr from "swr"



export default function Account() {
    const [cpass, setcpass] = useState("")
    const [pass, setpass] = useState("")
    const [retiped, setretiped] = useState("")
    const [err, seterr] = useState("")
    const { data, error } = useSwr("/api/account/view", getUserdetails)

    useEffect(() => {
        if (pass != retiped) {
            seterr("The passwords do not match")
        } else {
            seterr("")
        }
    }, [pass, retiped])

    if (error) return <div>Error fetching data: {error.message}</div>;
    if (!data) return <div>Loading...</div>

    const { firstname, lastname, email, role } = data

    function toTitleCase(str: any) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (pass !== retiped) {
            alert("The passwords do not match")
            return
        }
        try {
            updateuserpassword(pass, cpass)
            alert("Succes")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-8 relative z-10">
            <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-2 glass-blur mb-8">
                    <TabsTrigger value="account" className="text-white">Account</TabsTrigger>
                    <TabsTrigger value="password" className="text-white">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-white">{`Hello ` + lastname}</CardTitle>
                            <CardDescription className="text-blue-100">Acesta este contul tau</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-bold text-white">Nume</h3>
                                <h3 className="text-blue-100">{firstname}</h3>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-bold text-white">Prenume</h3>
                                <h3 className="text-blue-100">{lastname}</h3>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-bold text-white">Email</h3>
                                <h3 className="text-blue-100">{email}</h3>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-bold text-white">Rol</h3>
                                <h3 className="text-blue-100">{toTitleCase(role)}</h3>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="glass-card p-6 space-y-4">
                            <div>
                                <Label className="text-blue-100 font-semibold">Parola Curenta</Label>
                                <Input
                                    id="currentpassword"
                                    type="password"
                                    value={cpass}
                                    placeholder="Your current Password"
                                    onChange={(e) => setcpass(e.target.value)}
                                    className="glass-blur mt-2"
                                    required
                                />
                            </div>
                            {err && <h1 className="text-red-400 font-semibold">{err}</h1>}
                            <div>
                                <Label className="text-blue-100 font-semibold">Parola Noua</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={pass}
                                    placeholder="New Password"
                                    onChange={(e) => setpass(e.target.value)}
                                    className="glass-blur mt-2"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-blue-100 font-semibold">Rescrie Parola Noua</Label>
                                <Input
                                    id="retipepassword"
                                    type="password"
                                    value={retiped}
                                    placeholder="Retype Password"
                                    onChange={(e) => setretiped(e.target.value)}
                                    className="glass-blur mt-2"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white">
                                Trimite
                            </Button>
                        </div>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    )
}