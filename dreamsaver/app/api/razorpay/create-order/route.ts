import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  const { pack } = await req.json();

  let amount = 0;

  if (pack === "100") amount = 99;
  if (pack === "300") amount = 199;

  if (!amount) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "credits_" + Date.now(),
  });

  return NextResponse.json(order);
}