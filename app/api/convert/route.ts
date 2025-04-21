// // app/api/convert/route.ts
// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const from = searchParams.get('fromCurrency');
//     const to = searchParams.get('toCurrency');
//     const amount = searchParams.get('amount');

//     // 1. Basic parameter validation
//     if (!from || !to || !amount) {
//         return NextResponse.json({ error: 'パラメータが不足しています' }, { status: 400 });
//     }

//     try {
//         // 2. Call exchangerate.host API
//         const apiRes = await fetch(
//             `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
//         );
//         interface ExchangeRateResponse {
//             success: boolean;
//             result?: number;
//             error?: {
//                 code?: string;
//                 info?: string;
//             };
//         }

//         const data: ExchangeRateResponse = await apiRes.json(); // Use 'ExchangeRateResponse' interface for the response

//         // 3. Validate the response from exchangerate.host
//         // Check HTTP status AND the 'success' flag in the JSON response
//         // AND ensure the 'result' field exists and is a number
//         if (!apiRes.ok || !data || !data.success || typeof data.result !== 'number') {
//             // Construct a more informative error message if available
//             const errorMessage = data?.error?.info || data?.error || '為替レートの取得または計算に失敗しました';
//             // Return an appropriate status code, using the upstream API's status if not 200, or 502 Bad Gateway if conversion failed logically
//             return NextResponse.json({ error: errorMessage }, { status: apiRes.status !== 200 ? apiRes.status : 502 });
//         }

//         // 4. If validation passes, return the result
//         return NextResponse.json({ result: data.result });

//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error("Error fetching exchange rate:", error.message);
//         } else {
//             console.error("Error fetching exchange rate:", error);
//         }
//         // 5. Handle network errors or unexpected issues during the fetch
//         console.error("Error fetching exchange rate:", error);
//         return NextResponse.json({ error: 'サーバー側でエラーが発生しました' }, { status: 500 });
//     }
// }
