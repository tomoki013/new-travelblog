"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Receipt } from 'lucide-react'

const taxFormSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "有効な金額を入力してください",
    }),
    taxRate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "有効な税率を入力してください",
    }),
})

const TaxCalculatorPage = () => {
    const [taxResult, setTaxResult] = useState<string>("")

    const form = useForm<z.infer<typeof taxFormSchema>>({
        resolver: zodResolver(taxFormSchema),
        defaultValues: {
            amount: "",
            taxRate: "10",
        },
    })

    function onSubmit(values: z.infer<typeof taxFormSchema>) {
        const amount = Number(values.amount)
        const taxRate = Number(values.taxRate) / 100
        const tax = amount * taxRate
        const total = amount + tax

        setTaxResult(
            `税抜価格: ¥${amount.toLocaleString()}\n` +
            `消費税: ¥${tax.toLocaleString()}\n` +
            `税込価格: ¥${total.toLocaleString()}`
        )
    }

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">税金計算</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    商品やサービスの税込価格を簡単に計算できます。異なる税率にも対応し、正確な支払額を把握できます。
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Receipt className="h-5 w-5" />
                            消費税計算
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>金額（税抜）</FormLabel>
                                            <FormControl>
                                                <Input placeholder="10000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="taxRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>税率 (%)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="10" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">計算する</Button>
                            </form>
                        </Form>
                        {taxResult && (
                            <div className="mt-4 whitespace-pre-line rounded-lg bg-muted p-4 text-center font-medium">
                                {taxResult}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default TaxCalculatorPage;
