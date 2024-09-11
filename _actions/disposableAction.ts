'use server'
import disposableModel from '@/models/disposableModel'
import connectDB from '@/config/database'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getAllDesposable(
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
      sortOption = { price: 1 } // Ascending order
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 } // Descending order
    }

    const disposables = await disposableModel
      .find(searchQuery, { __v: false })
      .limit(limit!)
      .skip(limit! * (page! - 1))
      .sort(sortOption)
    const disposablesWithBase64 = disposables.map((disposable) => ({
      ...disposable.toObject(),

      img: {
        data: disposable.img.data.toString('base64'),
        contentType: disposable.img.contentType,
      },
    }))
    return {
      status: 200,
      data: { disposables: JSON.parse(JSON.stringify(disposablesWithBase64)) },
      totalCount: await disposableModel.countDocuments(),
    }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error fetching disposables',
    }
  }
}

export async function getDispoById(id: string) {
  try {
    await connectDB()
    const disposable = await disposableModel.findById(id, { __v: false })
    const despoImg = {
      data: disposable.img.data.toString('base64'),
      contentType: disposable.img.contentType,
    }

    const disposableWithImage = {
      ...disposable.toObject(),
      img: despoImg,
    }
    if (!disposable) {
      return { status: 404, message: 'Disposable not found' }
    }
    return {
      status: 200,
      data: {
        disposable: JSON.parse(JSON.stringify(disposableWithImage)),
        img: despoImg,
      },
    }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error fetching disposable',
    }
  }
}

export async function createDesposable(
  state: {
    status: number
    message: any
  },
  formData: FormData
) {
  const disposable = {
    productName: formData.get('productName'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File).type || 'image/jpeg',
    },
    price: formData.get('price'),
    flavor: formData.get('flavor'),
    quantity: formData.get('quantity'),
    topDispo: formData.get('topDispo'),
  }
  try {
    await connectDB()
    await disposableModel.create(disposable)
    revalidatePath('/admin/disposable')
    return { status: 201, message: 'Desposable created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updateDisposable(
  state: { status: number; message: string },
  formData: FormData
) {
  const disposableId = formData.get('_id')
  const disposable = {
    productName: formData.get('productName'),
    img: {
      data: Buffer.from(await (formData.get('img') as File)!.arrayBuffer()), //-
      contentType: (formData.get('img') as File)?.type || 'image/jpeg',
    },
    price: formData.get('price'),
    flavor: formData.get('flavor'),
    quantity: formData.get('quantity'),
    topDispo: formData.get('topDispo'),
  }
  try {
    await connectDB()
    await disposableModel.findByIdAndUpdate(disposableId, disposable, {
      new: true,
    })
    revalidatePath(`/admin/disposable`)
    return {
      status: 200,
      message: 'Disposable updated successfully',
      path: '/admin/disposable',
    }
  } catch (error) {
    return { status: 400, message: 'Error updated disposable' }
  }
}

export async function deleteDisposable(
  state: { status: number; message: string },
  formData: FormData
) {
  const disposableId = formData.get('_id')
  try {
    await connectDB()
    await disposableModel.findByIdAndDelete(disposableId)
    revalidatePath('/admin/disposable')
    return { status: 200, message: 'Disposable deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting disposable',
    }
  }
}
