import { FormEvent, useRef, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { InputForm } from '../../ui/InputForm'
import { ModalWindow } from '../../ui/ModalWindow'
import { ButtonSuccess } from '../../ui/Buttons/ButtonSuccess'
import { api } from '../../../services/apiClient'
import toast from 'react-hot-toast'

export const CreateNewCategory = () => {
	const modalRef = useRef<any>(null)
	const [title, seTitle] = useState('')

	const handleModalOpen = () => {
		modalRef.current?.handleModalOpen()
	}

	async function handleCreateCategory(event: FormEvent) {
		event.preventDefault()
		try {
			if (title === '') {
				toast.error('A categoria deve ter um nome')
				return
			}
			const categories = await api.post('/category', {
				title,
			})
			if (categories) {
				modalRef.current?.handleModalClose()
			}
			seTitle('')
			toast.success('Categoria criada com sucesso')
		} catch {
			toast.error('Erro ao criar categoria')
		}
	}

	return (
		<div className="flex items-center font-semibold text-lgm m-2">
			<p className="mb-2">Criar categoria</p>
			<MdAddCircle
				className="ml-2 mb-1 text-green-400 text-xl cursor-pointer"
				onClick={handleModalOpen}
			/>
			<ModalWindow
				ref={modalRef}
				contentLabel="Tem certeza que deseja sair?"
				title="Deseja criar uma nova categoria?"
			>
				<main>
					<form className="space-y-6 w-[700px]">
						<InputForm
							type="text"
							name="Título da categoria"
							value={title}
							placeholder="Título da categoria"
							onChange={(event) => seTitle(event)}
						/>
						<ButtonSuccess
							type="submit"
							onClick={handleCreateCategory}
						>
							Criar categoria
						</ButtonSuccess>
					</form>
				</main>
			</ModalWindow>
		</div>
	)
}
