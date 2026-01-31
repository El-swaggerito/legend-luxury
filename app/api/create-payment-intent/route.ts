import { NextRequest, NextResponse } from "next/server";

// MOCK: This would typically be a secure server-side call using your Stripe Secret Key
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "usd" } = await req.json();

    // MOCK: Create a fake client_secret for frontend testing
    // In production:
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100), // Stripe expects cents
    //   currency,
    // });
    // return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    console.log(`[Mock] Creating Stripe Payment Intent for ${amount} ${currency}`);
    
    // Returning a dummy secret that follows Stripe's format roughly, 
    // but this WON'T work with real Stripe Elements unless you have a real key.
    // However, for UI development, we handle the 'missing key' state in the frontend.
    return NextResponse.json({ 
      clientSecret: "pi_mock_secret_1234567890", 
      message: "This is a mock intent. Configure STRIPE_SECRET_KEY in .env for real payments."
    });

  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: "Error creating payment intent" },
      { status: 500 }
    );
  }
}
