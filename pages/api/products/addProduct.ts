import { promises as fs } from "fs";
import path from "path";
import Cloudinary from 'cloudinary'
import formidable, { File ,IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from "next";


export const config = {
    api: {
      bodyParser: false,
    }
  };
  
 export default async function handler(req:NextApiRequest,resp:NextApiResponse){
    var imageurl:any="";
    const form=formidable()
    const coloudinary=Cloudinary.v2
    coloudinary.config(process.env.CLOUDINARY_URL??"")
    try {
        
        form.parse(req,async(err,field,files)=>{
       
            if (!files.file) {
                resp.status(200).json({
                    url:"https://res.cloudinary.com/dzysn25nh/image/upload/v1661554179/noImageproduct_pign4w.png",
                    ok:true
                })
                return
            }
    
            imageurl=await coloudinary.uploader.upload((files.file as any).filepath)
    
            if(imageurl){
                resp.status(200).json({
                    url:imageurl.url,
                    ok:true
                })
            }
        })
    } catch (error) {
        resp.status(400).json({
            ok:false
        })
    }

}