import express, { Router, Request, Response } from "express";
import Stripe from "stripe";

const router: Router = express.Router();

// Αρχικοποίηση του Stripe με τον τύπο του
// Το process.env.STRIPE_SECRET_KEY μπορεί να είναι undefined, 
// οπότε βάζουμε ένα fallback ή cast για να μη γκρινιάζει η TS.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface PaymentRequest {
  amount: number;
}

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { amount }: PaymentRequest = req.body;

    if (!amount) {
      return res.status(400).send({ error: "Amount is required" });
    }

    // Το Stripe περιμένει integers (cents), γι' αυτό το Math.round είναι σωστό
    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe Error:", error.message);
    res.status(500).send({ error: error.message });
  }
});

export default router;