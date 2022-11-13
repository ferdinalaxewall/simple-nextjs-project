import { prisma } from "../../../lib/prisma";

export default async function handler(req, res){
    if(req.method === "GET"){
        try {
            const dataProduct = await prisma.product.findUnique({
                where : {
                    id : Number(req.query.productId)
                }
            })
            if(!dataProduct) return res.status(404).json({msg : "Product not found!"})
            res.status(200).json(dataProduct);
        } catch (error) {
            res.status(500).json({msg : error.response});
        }
    }else if(req.method === "PATCH"){
        const { name, price } = req.body;
        const dataProduct = await prisma.product.findUnique({
            where : {
                id : Number(req.query.productId)
            }
        })
        if(!dataProduct) return res.status(404).json({msg : "Product not found!"})

        try {
            await prisma.product.update({
                where : {
                    id : dataProduct.id
                },
                data : {
                    name : name,
                    price : price
                }
            });
            res.status(201).json({msg : "Product Successfully Updated!"})
        } catch (error) {
            res.status(400).json({msg : error.response});
        }
    }else if(req.method === "DELETE"){
        const dataProduct = await prisma.product.findUnique({
            where : {
                id : Number(req.query.productId)
            }
        })
        if(!dataProduct) return res.status(404).json({msg : "Product not found!"})

        try {
            await prisma.product.delete({
                where : {
                    id : dataProduct.id
                }
            });
            res.status(201).json({msg : "Product Successfully Updated!"})
        } catch (error) {
            res.status(400).json({msg : error.response});
        }
    }else{
        res.status(405).json({msg : "Method not allowed!"})
    }
}