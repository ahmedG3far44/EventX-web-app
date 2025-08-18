import { Router } from "express";



const router = Router();

router.use("/", async (req, res)=>{
    res.send("notifications")
});


export default router;
