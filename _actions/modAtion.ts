'use server'
import connectDB from '@/config/database'
import ModModel from '@/models/modModel'
import { revalidatePath } from 'next/cache'

export async function getAllMod(limit: number, page: number) {
  try {
    await connectDB()
    const mods = await ModModel.find({}, { __v: false })
      .limit(limit)
      .skip(limit * (page - 1))

    const modsWithBase64 = mods.map((mod) => ({
      ...mod.toObject(),
      img: {
        data: mod.img.data.toString('base64'),
        contentType: mod.img.contentType,
      },
    }))
    return {
      status: 200,
      data: {
        mods: JSON.parse(JSON.stringify(modsWithBase64)),
      },
      totalCount: await ModModel.countDocuments(),
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching mod',
    }
  }
}

export async function getModById(id: string) {
  try {
    await connectDB()
    const mod = await ModModel.findById(id, { __v: false })
    if (!mod) {
      return {
        status: 404,
        message: 'mod not found',
      }
    }
    const modsWithBase64 = {
      ...mod.toObject(),
      img: {
        data: mod.img.data.toString('base64'),
        contentType: mod.img.contentType,
      },
    }
    return {
      status: 200,
      data: {
        mod: JSON.parse(JSON.stringify(modsWithBase64)),
      },
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching mod',
    }
  }
}

export async function createMod(
  state: { status: number; message: any },
  formData: FormData
) {
  const mod = {
    productName: formData.get('productName'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    colors: formData.get('colors'),
  }
  try {
    await connectDB()
    await ModModel.create(mod)
    revalidatePath('/admin/mod')
    return { status: 201, message: 'Mod created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updateMod(
  state: { status: number; message: any },
  formData: FormData
) {
  const modId = formData.get('_id')
  const Mod = {
    productName: formData.get('productName'),
    price: formData.get('price'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    quantity: formData.get('quantity'),
    colors: formData.get('colors'),
  }
  try {
    await connectDB()
    await ModModel.findByIdAndUpdate(modId, Mod, {
      new: true,
    })
    revalidatePath('/admin/mod')
    return {
      status: 200,
      message: 'mod updated successfully',
      path: '/admin/mod',
    }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}


export async function deleteMod(
  state: { status: number; message: any },
  formData: FormData
) {
  const podSystemId = formData.get('_id')
  try {
    await connectDB()
    await ModModel.findByIdAndDelete(podSystemId)
    revalidatePath('/admin/mod')
    return { status: 200, message: 'mod deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting mod',
    }
  }
}
