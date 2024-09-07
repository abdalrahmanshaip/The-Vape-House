'use server'
import connectDB from '@/config/database'
import PodSystemModel from '@/models/podSystemModel'
import { revalidatePath } from 'next/cache'

export async function getAllPodSystems(limit: number, page: number) {
  try {
    await connectDB()
    const podSystem = await PodSystemModel.find({}, { __v: false })
      .limit(limit)
      .skip(limit * (page - 1))

    const PodSystemWithBase64 = podSystem.map((podSystem) => ({
      ...podSystem.toObject(),
      img: {
        data: podSystem.img.data.toString('base64'),
        contentType: podSystem.img.contentType,
      },
    }))
    return {
      status: 200,
      data: {
        podSystem: JSON.parse(JSON.stringify(PodSystemWithBase64)),
      },
      totalCount: await PodSystemModel.countDocuments(),
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching Pod',
    }
  }
}

export async function getPodsystemById(id: string) {
  try {
    await connectDB()
    const podSystem = await PodSystemModel.findById(id, { __v: false })
    if (!podSystem) {
      return {
        status: 404,
        message: 'Pod not found',
      }
    }
    const podSystemWithBase64 = {
      ...podSystem.toObject(),
      img: {
        data: podSystem.img.data.toString('base64'),
        contentType: podSystem.img.contentType,
      },
    }
    return {
      status: 200,
      data: {
        podSystem: JSON.parse(JSON.stringify(podSystemWithBase64)),
      },
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error fetching Pod',
    }
  }
}

export async function createPodSystem(
  state: { status: number; message: any },
  formData: FormData
) {
  const podSystem = {
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
    await PodSystemModel.create(podSystem)
    revalidatePath('/admin/pod-system')
    return { status: 201, message: 'Pod created successfully' }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function updatePodSystem(
  state: { status: number; message: any },
  formData: FormData
) {
  const podSystemId = formData.get('_id')
  const podSystems = {
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
    await PodSystemModel.findByIdAndUpdate(podSystemId, podSystems, {
      new: true,
    })
    revalidatePath('/admin/pod-system')
    return {
      status: 200,
      message: 'Pod updated successfully',
      path: '/admin/pod-system',
    }
  } catch (error: any) {
    return {
      status: 400,
      message: Object.values(error.errors).map((val: any) => val.message),
    }
  }
}

export async function deletePodSystem(
  state: { status: number; message: any },
  formData: FormData
) {
  const podSystemId = formData.get('_id')
  try {
    await connectDB()
    await PodSystemModel.findByIdAndDelete(podSystemId)
    revalidatePath('/admin/pod-system')
    return { status: 200, message: 'Pod deleted successfully' }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error deleting pod system',
    }
  }
}
