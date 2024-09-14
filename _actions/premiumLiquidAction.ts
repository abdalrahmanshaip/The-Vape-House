'use server'

import connectDB from '@/config/database'
import PremiumLiquidModel from '@/models/premiumLiquidModel'
import { revalidatePath } from 'next/cache'

export async function getAllPremiumLiquids(
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

    const premiumLiquids = await PremiumLiquidModel.find(searchQuery, {
      __v: false,
    })
      .limit(limit!)
      .skip(limit! * (page! - 1))
      .sort(sortOption)

    const premiumLiquidsWithBase64 = premiumLiquids.map((premiumliquid) => ({
      ...premiumliquid.toObject(),
      img: {
        data: premiumliquid.img.data.toString('base64'),
        contentType: premiumliquid.img.contentType,
      },
    }))

    return {
      status: 200,
      data: {
        premiumLiquids: JSON.parse(JSON.stringify(premiumLiquidsWithBase64)),
      },
      totalCount: await PremiumLiquidModel.countDocuments(),
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching premium liquids',
    }
  }
}

export async function getPremiumLiquidById(id: string) {
  try {
    await connectDB()
    const premiumLiquid = await PremiumLiquidModel.findById(id, { __v: false })

    if (!premiumLiquid) {
      return {
        status: 404,
        message: 'Premium Liquid not found',
      }
    }

    const premiumLiquidWithBase64 = {
      ...premiumLiquid.toObject(),
      img: {
        data: premiumLiquid.img.data.toString('base64'),
        contentType: premiumLiquid.img.contentType,
      },
    }

    return {
      status: 200,
      data: {
        premiumLiquid: JSON.parse(JSON.stringify(premiumLiquidWithBase64)),
      },
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching premium liquid',
    }
  }
}

export async function createPremiumLiquid(
  state: { status: number; message: any },
  formData: FormData
) {
  const premiumLiquid = {
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
    await PremiumLiquidModel.create(premiumLiquid)
    revalidatePath('/admin/premium-liquid')
    return { status: 201, message: 'Premium liquid created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updatePremiumLiquid(formData: FormData) {
  const premiumLiquidId = formData.get('_id') as string

  const premiumLiquid = {
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
    await PremiumLiquidModel.findByIdAndUpdate(premiumLiquidId, premiumLiquid, {
      new: true,
    })
    revalidatePath('/admin/premium-liquid')
    return { status: 200, message: 'Premium liquid updated successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function deletePremiumLiquid(
  state: { status: number; message: string },
  formData: FormData
) {
  const premiumLiquidId = formData.get('_id') as string

  try {
    await connectDB()
    await PremiumLiquidModel.findByIdAndDelete(premiumLiquidId)
    revalidatePath('/admin/premium-liquid')
    return { status: 200, message: 'Premium liquid deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting premium liquid',
    }
  }
}
