'use client'

import { deleteMod } from '@/_actions/modAtion'
import { deletePodSystem } from '@/_actions/podSystemAction'
import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import { MdDelete } from 'react-icons/md'
import { toast } from 'sonner'

const initialState = {
  status: 0,
  message: '',
}
const DeleteMod = ({ _id }: { _id: string }) => {
  const [state, formAction] = useFormState(deleteMod, initialState)
  if (state.status === 200) {
    toast.success(state.message)
  } else if (state.status === 500) {
    toast.error(state.message)
  }
  return (
    <div>
      <form action={formAction}>
        <input
          type='hidden'
          name='_id'
          value={_id}
        />
        <Button variant={'ghost'}>
          <MdDelete size={30} />
        </Button>
      </form>
    </div>
  )
}

export default DeleteMod
