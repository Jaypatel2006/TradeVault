import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { NextResponse } from 'next/server';
import {v2 as cloudinary} from "cloudinary";
cloudinary.config({ 
    cloud_name: 'daolco0ze', 
    api_key: `${process.env.CLDKEY}`, 
    api_secret: `${process.env.CLDSECRET}` 
});

import {connectdb} from '../../../db/connect.js';
import {Product} from '../../../db/product.model.js';

const upload = multer({ dest: './public/' }); // Save files temporarily in public folder

export const POST = async (req) => {
    try {
        await connectdb();  // Connect to the database

        const formData = await req.formData();
        const file = formData.get('image');  // Retrieve the uploaded file
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price');

        if (!file || !file.name) {
            return NextResponse.json({ error: 'Image file is required.' }, { status: 400 });
        }

        const filePath = `./public/${file.name}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath, { folder: 'TradeVault' });

        // Delete file from server
        fs.unlinkSync(filePath);

        if (!uploadResult) {
            return NextResponse.json({ error: 'Failed to upload image to Cloudinary.' }, { status: 500 });
        }

        // Save product to the database
        const newProduct = new Product({
            name,
            description,
            price,
            image: uploadResult.secure_url
        });

        await newProduct.save();

        return NextResponse.json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }
};
