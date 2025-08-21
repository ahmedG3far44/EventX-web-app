import { Router } from "express";
import {
  withdrawWalletBalance,
  depositWalletBalance,
  getWalletTransactions,
} from "../controllers/wallet.controllers.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = Router();

//api/wallet/transactions
router.get("/transactions", verifyAccessToken, getWalletTransactions);
//api/wallet/withdraw
router.post("/withdraw", verifyAccessToken, withdrawWalletBalance);
//api/wallet/deposit
router.post("/deposit", verifyAccessToken, depositWalletBalance);

export default router;
