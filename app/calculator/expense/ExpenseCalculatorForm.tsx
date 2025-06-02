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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calculator } from 'lucide-react'

const expenseFormSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "有効な金額を入力してください",
    }),
    category: z.string({
        required_error: "カテゴリーを選択してください",
    }),
    numberOfPeople: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "有効な人数を入力してください",
    }),
})

type ExpenseFormValues = z.infer<typeof expenseFormSchema>

const ExpenseCalculatorForm = () => {
    const [expenseResult, setExpenseResult] = useState<string>("")

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseFormSchema),
        defaultValues: {
            amount: "",
            category: "",
            numberOfPeople: "1",
        },
    })

    function onSubmit(values: ExpenseFormValues) {
        const amount = Number(values.amount)
        const people = Number(values.numberOfPeople)
        const perPerson = amount / people
        setExpenseResult(`1人あたり: ¥${perPerson.toLocaleString()}`)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    旅費の割り勘計算
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
                                    <FormLabel>金額</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>カテゴリー</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="カテゴリーを選択" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="transportation">交通費</SelectItem>
                                            <SelectItem value="accommodation">宿泊費</SelectItem>
                                            <SelectItem value="food">食費</SelectItem>
                                            <SelectItem value="activity">アクティビティ</SelectItem>
                                            <SelectItem value="shopping">買い物</SelectItem>
                                            <SelectItem value="other">その他</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfPeople"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>人数</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">計算する</Button>
                    </form>
                </Form>
                {expenseResult && (
                    <div className="mt-4 rounded-lg bg-muted p-4 text-center font-medium">
                        {expenseResult}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ExpenseCalculatorForm;
