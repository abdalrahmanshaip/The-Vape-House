'use server'

import connectDB from '@/config/database'
import LiquidModel from '@/models/liquidModel'
import { revalidatePath } from 'next/cache'

export async function getAllLiquids(
  limit?: number,
  page?: number,
  productName?: string,
  sort?: string,
  nicotine?: string,
  nicotineType?: string,
  size?: string,
  line?: string
) {
  try {
    await connectDB()
    const searchQuery: any = {}

    if (productName) {
      searchQuery.productName = { $regex: productName, $options: 'i' }
    }
    if (nicotine?.length) {
      searchQuery['variations.nicotine'] = { $in: nicotine }
    }
    if (nicotineType?.length) {
      searchQuery['variations.nicotineType'] = { $in: nicotineType }
    }
    if (line?.length) {
      searchQuery.line = { $in: line }
    }
    if (size?.length) {
      searchQuery['variations.size'] = { $in: size }
    }
    let sortOption = {}
    if (sort === 'price_asc') {
      sortOption = { price: 1 }
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 }
    }
    const liquids = await LiquidModel.find(searchQuery, { __v: false })
      .limit(limit!)
      .skip(limit! * (page! - 1))
      .sort(sortOption)

    const liquidsWithBase64 = liquids.map((liquid) => ({
      ...liquid.toObject(),
      img: {
        data: liquid.img.data.toString('base64'),
        contentType: liquid.img.contentType,
      },
    }))

    return {
      status: 200,
      data: {
        liquids: JSON.parse(JSON.stringify(liquidsWithBase64)),
      },
      totalCount: await LiquidModel.countDocuments(),
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching liquids',
    }
  }
}

export async function getLiquidById(id: string) {
  try {
    await connectDB()
    const liquid = await LiquidModel.findById(id, { __v: false })

    if (!liquid) {
      return {
        status: 404,
        message: 'Liquid not found',
      }
    }

    const liquidWithBase64 = {
      ...liquid.toObject(),
      img: {
        data: liquid.img.data.toString('base64'),
        contentType: liquid.img.contentType,
      },
    }

    return {
      status: 200,
      data: {
        liquid: JSON.parse(JSON.stringify(liquidWithBase64)),
      },
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching liquid',
    }
  }
}

export async function createLiquid(
  state: { status: number; message: any },
  formData: FormData
) {
  const liquid = {
    productName: formData.get('productName') as string,
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()),
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    variations: JSON.parse(formData.get('variations') as string),
    line: formData.get('line'),
  }

  try {
    await connectDB()
    await LiquidModel.create(liquid)
    revalidatePath('/admin/e-liquid')
    return { status: 201, message: 'Liquid created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updateLiquid(formData: FormData) {
  const liquidId = formData.get('_id') as string

  const liquid = {
    productName: formData.get('productName') as string,
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()),
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    variations: JSON.parse(formData.get('variations') as string),
    line: formData.get('line'),
  }

  try {
    await connectDB()
    await LiquidModel.findByIdAndUpdate(liquidId, liquid, { new: true })
    revalidatePath('/admin/e-liquid')
    return { status: 200, message: 'Liquid updated successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function deleteLiquid(
  state: { status: number; message: string },
  formData: FormData
) {
  const liquidId = formData.get('_id') as string

  try {
    await connectDB()
    await LiquidModel.findByIdAndDelete(liquidId)
    revalidatePath('/admin/e-liquid')
    return { status: 200, message: 'Liquid deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting liquid',
    }
  }
}
