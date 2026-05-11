"use client"

import "../signin/style.css";
import { Button } from "@/components/ui/button"
import { GlassInput, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { register } from "./server"
import { Textarea } from "@chakra-ui/react"


export default function Register() {
    const [nume, setnume] = useState("")
    const [prenume, setprenume] = useState("")
    const [email, setemail] = useState("")
    const [password, setpasword] = useState("")
    const [retipepassword, setretipepasword] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [companyDescription, setCompanyDescription] = useState("")
    const [error, seterror] = useState("")


    useEffect(() => {
        if (password !== retipepassword) {
            if (error === "") {
                seterror("Parole-le nu sunt identice")
            }
        } else {
            if (error !== "") {
                seterror("")
            }
        }
    }, [password, retipepassword, error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== retipepassword) {
            alert("Parole-le nu sunt identice")
            return
        }

        const data = new FormData(e.currentTarget)
        console.log(data)

        register(
            nume,
            prenume,
            email,
            password,
            companyName,
            companyDescription
        ).then(({ statusText, status }) => {
            if (status != 200) {
                alert(statusText)
                return
            }
            alert(statusText)

            const callback = (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('callback') : null) || "/dashboard"
            location.replace(callback);

        })

    }

    return (
        <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}>
            <div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="nume">Nume</Label>
                    <GlassInput
                        id="nume"
                        type="text"
                        placeholder="Nume"
                        autoComplete="name"
                        value={nume}
                        onChange={(e) => setnume(e.target.value)}
                        className="glass"
                        required
                    />
                </div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="prenume">Prenume</Label>
                    <GlassInput
                        id="prenume"
                        type="text"
                        placeholder="Prenume"
                        autoComplete="additional-name"
                        value={prenume}
                        onChange={(e) => setprenume(e.target.value)}
                        className="glass"
                        required
                    />
                </div>
            </div>
            <div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="email">Email</Label>
                    <GlassInput
                        id="email"
                        type="email"
                        value={email}
                        placeholder="example@example.com"
                        autoComplete="email"
                        onChange={(e) => setemail(e.target.value)}
                        className="glass"
                        required
                    />
                </div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="cmpName">Nume Companie</Label>
                    <GlassInput
                        id="cmpName"
                        type="text"
                        placeholder="Nume Companie"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="glass"
                        required
                    />
                </div>
                {/* <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <DropdownMenu>
                        <Label htmlFor="roleb">Alege Rolul</Label>
                        <DropdownMenuTrigger asChild id="roleb">
                            <Button variant="outline" className="w-full">{position}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup defaultValue={"Utilizator"} id="role">
                                <DropdownMenuRadioItem value="Utilizator">Utilizator</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Administrator">Administrator</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div> */}
            </div>
            <div style={{ display: "inline-block", padding: "10px", width: "500px" }}>
                <Label htmlFor="cmpDesc">
                    Descriere Companie
                </Label>
                <GlassInput
                    id="cmpDesc"
                    type="text"
                    placeholder="Descriere Companie"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    className="glass"
                    required
                // className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="password">Parola</Label>
                    <GlassInput
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Example Password"
                        autoComplete="new-password"
                        onChange={(e) => setpasword(e.target.value)}
                        className="glass"
                        required
                    />
                </div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="retipepassword">Rescrie Parola</Label>
                    <GlassInput
                        id="retipepassword"
                        type="password"
                        value={retipepassword}
                        placeholder="Example Password"
                        autoComplete="new-password"
                        onChange={(e) => setretipepasword(e.target.value)}
                        className="glass"
                        required
                    />
                </div>
            </div>
            <div>
                <div style={{ display: "inline-block", padding: "10px", width: "500px", }}>
                    <Button type="submit" className="w-full">
                        Salvează
                    </Button>
                </div>
            </div>
        </form>
    )
}