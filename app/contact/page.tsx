import ContactForm from "./ContactForm"
import { Metadata } from 'next'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'お問い合わせ',
    description: 'ご質問、ご意見、ご提案などがございましたら、お気軽にお問い合わせください。',
    openGraph: {
        title: 'お問い合わせ',
        description: 'ご質問、ご意見、ご提案などがpigございましたら、お気軽にお問い合わせください。',
    },
    twitter: {
        title: 'お問い合わせ',
        description: 'ご質問、ご意見、ご提案などがございましたら、お気軽にお問い合わせください。',
    },
}

const ContactPage = () => {
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
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-start">
                            <Mail className="mr-3 h-5 w-5 text-primary" />
                            <div>
                                <h3 className="text-sm font-medium">メール</h3>
                                <Link href="mailto:gaomuyouxi81@gmail.com" className="text-sm text-muted-foreground">gaomuyouxi81@gmail.com</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage;
