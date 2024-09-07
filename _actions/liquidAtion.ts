'use server'

import connectDB from '@/config/database'
import LiquidModel from '@/models/liquidModel'
import { revalidatePath } from 'next/cache'

export async function getAllLiquids(limit: number, page: number) {
  try {
    await connectDB()
    const liquids = await LiquidModel.find({}, { __v: false })
      .limit(limit)
      .skip(limit * (page - 1))

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
    variations: JSON.parse(formData.get('variations') as string), // Expecting an array of variations passed as JSON string
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

export async function deleteLiquid(formData: FormData) {
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
