import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { from, to, body } = await request.json();
  const twilio = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(process.env.TWILIO_ACCOUNT_SID + ":" + process.env.TWILIO_AUTH_TOKEN)
      },
      body: new URLSearchParams({
        From: from,
        To: to,
        Body: body
      }).toString()
    }
  );

  return NextResponse.json({ message: await twilio.json() });
}
