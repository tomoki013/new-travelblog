export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
  agreeToTerms: boolean;
}

export const sendContactForm = async (data: ContactFormData) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("メール送信に失敗しました。");
  }

  return response.json();
};
