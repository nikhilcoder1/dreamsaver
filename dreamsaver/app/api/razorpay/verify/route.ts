import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    pack,
  } = body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(sign)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  let credits = 0;
  if (pack === "100") credits = 100;
  if (pack === "300") credits = 300;

  const supabase = createClient();
  const { data } = await (await supabase).auth.getUser();

  const userId = data.user?.id;

  const { data: userRow } = await (await supabase)
    .from("users")
    .select("insight_count")
    .eq("id", userId)
    .single();

  const newCredits = (userRow?.insight_count || 0) + credits;

  await (await supabase)
    .from("users")
    .update({ insight_count: newCredits })
    .eq("id", userId);

  return NextResponse.json({ success: true });
}