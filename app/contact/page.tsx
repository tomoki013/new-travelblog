"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Mail } from 'lucide-react'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "お名前は2文字以上で入力してください。",
    }),
    email: z.string().email({
        message: "有効なメールアドレスを入力してください。",
    }),
    subject: z.string().min(5, {
        message: "件名は5文字以上で入力してください。",
    }),
    message: z.string().min(10, {
        message: "メッセージは10文字以上で入力してください。",
    }),
    inquiryType: z.string({
        required_error: "お問い合わせの種類を選択してください。",
    }),
    agreeToTerms: z.boolean().refine(val => val === true, {
        message: "プライバシーポリシーに同意する必要があります。",
    }),
})

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
            agreeToTerms: false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.error('メール送信に失敗しました。');
            }
        })
        .catch((error) => {
            console.error('エラーが発生しました:', error);
        });
    }

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">お問い合わせ</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    ご質問、ご意見、ご提案などがございましたら、お気軽にお問い合わせください。
                </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>連絡先情報</CardTitle>
                            <CardDescription>
                                以下の方法でもお問い合わせいただけます。
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start">
                                <Mail className="mr-3 h-5 w-5 text-primary" />
                                <div>
                                    <h3 className="text-sm font-medium">メール</h3>
                                    <p className="text-sm text-muted-foreground">gaomuyouxi81@gmail.com</p>
                                </div>
                            </div>
                            {/* <div className="flex items-start">
                                <Phone className="mr-3 h-5 w-5 text-primary" />
                                <div>
                                    <h3 className="text-sm font-medium">電話</h3>
                                    <p className="text-sm text-muted-foreground">03-1234-5678</p>
                                    <p className="text-xs text-muted-foreground">平日 10:00〜18:00</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="mr-3 h-5 w-5 text-primary" />
                                <div>
                                    <h3 className="text-sm font-medium">所在地</h3>
                                    <p className="text-sm text-muted-foreground">
                                        〒100-0001<br />
                                        東京都千代田区千代田1-1<br />
                                        旅行日記ビル 5F
                                    </p>
                                </div>
                            </div> */}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    {isSubmitted ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>お問い合わせありがとうございます</CardTitle>
                                <CardDescription>
                                    メッセージを受け付けました。通常2営業日以内にご返信いたします。
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    ご質問やご意見をお寄せいただき、誠にありがとうございます。
                                    内容を確認次第、担当者より折り返しご連絡させていただきます。
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => setIsSubmitted(false)}>新しいお問い合わせ</Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>お問い合わせフォーム</CardTitle>
                                <CardDescription>
                                    以下のフォームに必要事項をご記入ください。
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>お名前</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="山田 太郎" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>メールアドレス</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="example@email.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                          
                                        <FormField
                                            control={form.control}
                                            name="inquiryType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>お問い合わせの種類</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="お問い合わせの種類を選択してください" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="general">一般的なお問い合わせ</SelectItem>
                                                            <SelectItem value="feedback">サイトへのご意見・ご感想</SelectItem>
                                                            <SelectItem value="collaboration">コラボレーションのご提案</SelectItem>
                                                            <SelectItem value="correction">記事内容の修正依頼</SelectItem>
                                                            <SelectItem value="other">その他</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>件名</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="お問い合わせの件名" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>メッセージ</FormLabel>
                                                    <FormControl>
                                                        <Textarea 
                                                            placeholder="お問い合わせ内容を入力してください" 
                                                            className="min-h-[150px]" 
                                                            {...field} 
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="agreeToTerms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            プライバシーポリシーに同意します
                                                        </FormLabel>
                                                        <FormDescription>
                                                            お問い合わせいただいた内容は、お問い合わせへの回答のみに使用します。
                                                        </FormDescription>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full">送信する</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
