import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
    if(req.method === "GET"){
        try {
            const response = await prisma.product.findMany();
            res.status(200).json({products : response});
        } catch (error) {
            res.status(500).json({msg : error.response});
        }
    }else if(req.method === "POST"){
        const { name, price } = req.body
        try {
            const dataProduct = await prisma.product.create({
                data: {
                    name : name,
                    price : Number(price)
                }
            });
            res.status(200).json({msg : "Successfully Created Product!"})
        } catch (error) {
            res.status(400).json({msg : error.response})
        }
    }else{
        res.status(405).json({msg : "Method not allowed!"})
    }
}