'use server'

import connectDB from '@/config/database'
import coilsCartidgeModel from '@/models/coilsCartidgesModel'
import { revalidatePath } from 'next/cache'

export async function getAllCoilsCartidges(
  limit?: number,
  page?: number,
  productName?: string,
  sort?: string
) {
  try {
    await connectDB()
    const searchQuery = productName
      ? { productName: { $regex: productName, $options: 'i' } }
      : {}

    let sortOption = {}
    if (sort === 'price_asc') {
      sortOption = { price: 1 }
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 }
    }
    const coilsCartidges = await coilsCartidgeModel
      .find(searchQuery, { __v: false })
      .limit(limit!)
      .skip(limit! * (page! - 1))
      .sort(sortOption)
    const coilsCartidgeWithBase64 = coilsCartidges.map((coilsCartidge) => ({
      ...coilsCartidge.toObject(),

      img: {
        data: coilsCartidge.img.data.toString('base64'),
        contentType: coilsCartidge.img.contentType,
      },
    }))
    return {
      status: 200,
      data: {
        coildsCartidges: JSON.parse(JSON.stringify(coilsCartidgeWithBase64)),
      },
      totalCount: await coilsCartidgeModel.countDocuments(),
    }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error fetching disposables',
    }
  }
}

export async function getCoilsCartidgeById(id: string) {
  try {
    await connectDB()
    const colisCartige = await coilsCartidgeModel.findById(id, { __v: false })
    const colisCartigeImg = {
      data: colisCartige.img.data.toString('base64'),
      contentType: colisCartige.img.contentType,
    }

    const colisCartigeWithImage = {
      ...colisCartige.toObject(),
      img: colisCartigeImg,
    }
    if (!colisCartige) {
      return { status: 404, message: 'colisCartige not found' }
    }
    return {
      status: 200,
      data: {
        coildsCartidge: JSON.parse(JSON.stringify(colisCartigeWithImage)),
        img: colisCartigeImg,
      },
    }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error fetching colisCartige',
    }
  }
}

export async function createCoilsCartidge(
  state: {
    status: number
    message: any
  },
  formData: FormData
) {
  const coildsCartidge = {
    productName: formData.get('productName'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    price: formData.get('price'),
    resistance: formData.get('resistance'),
    quantity: formData.get('quantity'),
  }
  try {
    await connectDB()
    await coilsCartidgeModel.create(coildsCartidge)
    revalidatePath('/admin/coils-cartidges')
    return { status: 201, message: 'coils or cartidges created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updateCoilsCartidge(
  state: { status: number; message: string },
  formData: FormData
) {
  const coildsCartidgeId = formData.get('_id')
  const coildsCartidge = {
    productName: formData.get('productName'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    price: formData.get('price'),
    resistance: formData.get('resistance'),
    quantity: formData.get('quantity'),
  }
  try {
    await connectDB()
    await coilsCartidgeModel.findByIdAndUpdate(
      coildsCartidgeId,
      coildsCartidge,
      {
        new: true,
      }
    )
    revalidatePath(`/admin/coils-cartidges`)
    return {
      status: 200,
      message: 'coils-cartidges updated successfully',
      path: '/admin/coils-cartidges',
    }
  } catch (error) {
    return { status: 400, message: 'Error updated coils-cartidges' }
  }
}

export async function deleteCoilsCartidge(
  state: { status: number; message: string },
  formData: FormData
) {
  const coilsCartidgeId = formData.get('_id')
  try {
    await connectDB()
    await coilsCartidgeModel.findByIdAndDelete(coilsCartidgeId)
    revalidatePath('/admin/coils-cartidges')
    return { status: 200, message: 'coils-cartidges deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting coils-cartidges',
    }
  }
}
