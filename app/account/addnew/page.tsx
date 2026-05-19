"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GlassInput, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewUser } from "@/models/User"
import { useEffect, useState } from "react"


export default function AddnewPage() {
    const [nume, setnume] = useState("")
    const [prenume, setprenume] = useState("")
    const [email, setemail] = useState("")
    const [password, setpasword] = useState("")
    const [retipepassword, setretipepasword] = useState("")
    const [position, setPosition] = useState("Utilizator")
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

        addNewUser(
            nume,
            prenume,
            email,
            password,
            position
        ).then(({ statusText, status }) => {
            if (status != 200) {
                alert(statusText)
                return
            }
            alert("Ai adaugat userul cu succes")
        })

    }

    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="nume" className="text-blue-100 font-semibold">Nume</Label>
                    <GlassInput
                        id="nume"
                        type="text"
                        placeholder="Nume"
                        autoComplete="name"
                        value={nume}
                        onChange={(e) => setnume(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="prenume" className="text-blue-100 font-semibold">Prenume</Label>
                    <GlassInput
                        id="prenume"
                        type="text"
                        placeholder="Prenume"
                        autoComplete="additional-name"
                        value={prenume}
                        onChange={(e) => setprenume(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="email" className="text-blue-100 font-semibold">Email</Label>
                    <GlassInput
                        id="email"
                        type="email"
                        value={email}
                        placeholder="example@example.com"
                        autoComplete="email"
                        onChange={(e) => setemail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <DropdownMenu>
                        <Label htmlFor="roleb" className="text-blue-100 font-semibold">Alege Rolul</Label>
                        <DropdownMenuTrigger asChild id="roleb">
                            <Button variant="outline" className="w-full bg-black/30 backdrop-blur-xl text-white placeholder:text-white/50 border border-white/20">{position}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup defaultValue={"Utilizator"} id="role">
                                <DropdownMenuRadioItem value="Utilizator">Utilizator</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Administrator">Administrator</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center">
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="password" className="text-blue-100 font-semibold">Parola</Label>
                    <GlassInput
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Example Password"
                        autoComplete="new-password"
                        onChange={(e) => setpasword(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: "inline-block", padding: "10px", width: "250px" }}>
                    <Label htmlFor="retipepassword" className="text-blue-100 font-semibold">Rescrie Parola</Label>
                    <GlassInput
                        id="retipepassword"
                        type="password"
                        value={retipepassword}
                        placeholder="Example Password"
                        autoComplete="new-password"
                        onChange={(e) => setretipepasword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div style={{ display: "inline-block", padding: "10px", width: "500px", }}>
                    <Button type="submit" className="w-full">
                        Adauga Utilizator
                    </Button>
                </div>
            </div>
        </form>
    )
}