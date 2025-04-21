// "use client"

// import { useState } from 'react'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { DollarSign } from 'lucide-react'

// const currencyFormSchema = z.object({
//     amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
//         message: "有効な金額を入力してください",
//     }),
//     fromCurrency: z.string({
//         required_error: "通貨を選択してください",
//     }),
//     toCurrency: z.string({
//         required_error: "通貨を選択してください",
//     }),
// })

// const CurrencyCalculatorPage = () => {
//     const [currencyResult, setCurrencyResult] = useState<string>("")

//     const form = useForm<z.infer<typeof currencyFormSchema>>({
//         resolver: zodResolver(currencyFormSchema),
//         defaultValues: {
//             amount: "",
//             fromCurrency: "JPY",
//             toCurrency: "USD",
//         },
//     })

// 	async function onSubmit(values: z.infer<typeof currencyFormSchema>) {
// 		try {
// 			// カンマを除去した金額を取得
// 			const sanitizedAmount = values.amount.replace(/,/g, '');
// 			// 自作API Routerを経由してリアルタイム換算
// 			const res = await fetch(
// 				`/api/convert?fromCurrency=${values.fromCurrency}&toCurrency=${values.toCurrency}&amount=${sanitizedAmount}`
// 			)
// 			const json = await res.json()
// 			if (!res.ok) throw new Error(json.error || 'Unknown error')

// 			const amountNum = Number(sanitizedAmount)
// 			setCurrencyResult(
// 				`${amountNum.toLocaleString()} ${values.fromCurrency} = ${Number(json.result).toLocaleString()} ${values.toCurrency}`
// 			)
//         } catch (err: unknown) {
//             if (err instanceof Error) {
//                 setCurrencyResult(`エラー: ${err.message}`)
//             } else {
//                 setCurrencyResult("エラー: 不明なエラーが発生しました")
//             }
//         }
// 	}

//     return (
//         <div className="container py-12">
//             <div className="mb-12 text-center">
//                 <h1 className="mb-4 text-4xl font-bold">為替計算</h1>
//                 <p className="mx-auto max-w-2xl text-muted-foreground">
//                     主要通貨間の為替レートを簡単に計算できます。旅行前の予算計画や、現地での支出管理にお役立てください。
//                 </p>
//             </div>

//             <div className="mx-auto max-w-xl">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <DollarSign className="h-5 w-5" />
//                             通貨換算
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                                 <FormField
//                                     control={form.control}
//                                     name="amount"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>金額</FormLabel>
//                                             <FormControl>
//                                                 <Input type='number' placeholder="10000" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} 
//                                 />
//                                 <div className="grid gap-4 sm:grid-cols-2">
//                                     <FormField
//                                         control={form.control}
//                                         name="fromCurrency"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>変換元の通貨</FormLabel>
//                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                     <FormControl>
//                                                         <SelectTrigger>
//                                                             <SelectValue placeholder="通貨を選択" />
//                                                         </SelectTrigger>
//                                                     </FormControl>
//                                                     <SelectContent>
//                                                         <SelectItem value="JPY">日本円 (JPY)</SelectItem>
//                                                         <SelectItem value="USD">米ドル (USD)</SelectItem>
//                                                         <SelectItem value="EUR">ユーロ (EUR)</SelectItem>
//                                                         <SelectItem value="GBP">英ポンド (GBP)</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     <FormField
//                                         control={form.control}
//                                         name="toCurrency"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>変換先の通貨</FormLabel>
//                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                     <FormControl>
//                                                         <SelectTrigger>
//                                                             <SelectValue placeholder="通貨を選択" />
//                                                         </SelectTrigger>
//                                                     </FormControl>
//                                                     <SelectContent>
//                                                         <SelectItem value="JPY">日本円 (JPY)</SelectItem>
//                                                         <SelectItem value="USD">米ドル (USD)</SelectItem>
//                                                         <SelectItem value="EUR">ユーロ (EUR)</SelectItem>
//                                                         <SelectItem value="GBP">英ポンド (GBP)</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 <Button type="submit" className="w-full">計算する</Button>
//                             </form>
//                         </Form>
//                         {currencyResult && (
//                             <div className="mt-4 rounded-lg bg-muted p-4 text-center font-medium">
//                                 {currencyResult}
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     )
// }

// export default CurrencyCalculatorPage;
