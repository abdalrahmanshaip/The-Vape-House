'use server'
import connectDB from '@/config/database'
import TanksModel from '@/models/tanksModel'
import { revalidatePath } from 'next/cache'

export async function getAllTanks(
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
    const tanks = await TanksModel
      .find(searchQuery, { __v: false })
      .limit(limit!)
      .skip(limit! * (page! - 1))
      .sort(sortOption)

    const tankWithBase64 = tanks.map((tank) => ({
      ...tank.toObject(),
      img: {
        data: tank.img.data.toString('base64'),
        contentType: tank.img.contentType,
      },
    }))
    return {
      status: 200,
      data: {
        tanks: JSON.parse(JSON.stringify(tankWithBase64)),
      },
      totalCount: await TanksModel.countDocuments(),
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching tanks',
    }
  }
}

export async function getTankById(id: string) {
  try {
    await connectDB()
    const tank = await TanksModel.findById(id, { __v: false })
    if (!tank) {
      return {
        status: 404,
        message: 'Tank not found',
      }
    }
    const tankWithBase64 = {
      ...tank.toObject(),
      img: {
        data: tank.img.data.toString('base64'),
        contentType: tank.img.contentType,
      },
    }
    return {
      status: 200,
      data: {
        tank: JSON.parse(JSON.stringify(tankWithBase64)),
      },
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching tank',
    }
  }
}

export async function createTank(
  state: { status: number; message: any },
  formData: FormData
) {
  const tanks = {
    productName: formData.get('productName'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    price: parseFloat(formData.get('price') as string),
    quantity: parseInt(formData.get('quantity') as string),
  }
  try {
    await connectDB()
    await TanksModel.create(tanks)
    revalidatePath('/admin/tanks')
    return { status: 201, message: 'Tank created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updateTank(
  state: { status: number; message: any },
  formData: FormData
) {
  const tankId = formData.get('_id')
  const tanks = {
    productName: formData.get('productName'),
    price: formData.get('price'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    quantity: formData.get('quantity'),
  }
  try {
    await connectDB()
    await TanksModel.findByIdAndUpdate(tankId, tanks, { new: true })
    revalidatePath('/admin/tanks')
    return {
      status: 200,
      message: 'Tank updated successfully',
      path: '/admin/tanks',
    }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function deleteTank(
  state: { status: number; message: any },
  formData: FormData
) {
  const tankId = formData.get('_id')
  try {
    await connectDB()
    await TanksModel.findByIdAndDelete(tankId)
    revalidatePath('/admin/tanks')
    return { status: 200, message: 'Tank deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting tank',
    }
  }
}
