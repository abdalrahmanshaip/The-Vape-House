'use client'

import { deleteLiquid } from '@/_actions/liquidAtion'
import { deleteMod } from '@/_actions/modAtion'
import { deletePodSystem } from '@/_actions/podSystemAction'
import { deletePremiumLiquid } from '@/_actions/premiumLiquidAction'
import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import { MdDelete } from 'react-icons/md'
import { toast } from 'sonner'

const initialState = {
  status: 0,
  message: '',
}
const DeletePremiumLiquid = ({ _id }: { _id: string }) => {
  const [state, formAction] = useFormState(deletePremiumLiquid, initialState)
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

export default DeletePremiumLiquid
