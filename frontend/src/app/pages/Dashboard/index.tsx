import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Menu } from '../../shared/components/Menu'
import { api } from '../../shared/services/apiClient'
import { ModalWindow } from '../../shared/components/ui/ModalWindow'
import { ButtonSuccess } from '../../shared/components/ui/Buttons/ButtonSuccess'
import { InputForm } from '../../shared/components/ui/InputForm'
import { InputSelect } from '../../shared/components/ui/InputSelect'
import { Category } from '../../shared/components/Categories/Category'
import { Sidebar } from '../../shared/components/Sidebar'

export interface ICategoriesProps {
	value: string
	label: string
}

interface IDashProps {
	categoryId?: string
}

export const Dashboard = ({ categoryId }: IDashProps) => {
	const modalRef = useRef<any>(null)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [progress, setProgress] = useState(0)
	const [concluded, setConcluded] = useState(false)
	const [options, setOptions] = useState([
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	])
	const [categories, setCategories] = useState<ICategoriesProps[]>([])
	const [selectedCategories, setSelectedCategories] = useState<ICategoriesProps | null>(null);
	const [selectedCategory, setSelectedCategory] = useState('');

	const handleCategoryClick = (categoryId: string) => {
		setSelectedCategory(categoryId);
	}

	async function handleCreateTask(event: FormEvent) {
		event.preventDefault()
		try {
			if (title === '' || content === '') {
				toast.error('Preencha todos os campos')
				return
			}
			const task = await api.post('/tasks', {
				title,
				content,
				progress,
				concluded,
				category_id: selectedCategories?.value,
			})
			if (task) {
				modalRef.current?.handleModalClose()
			}
			setTitle('')
			setContent('')
			setProgress(0)
			setConcluded(false)
			toast.success('Tarefa criada com sucesso')
		} catch {
			toast.error('Erro ao criar tarefa')
		}
	}

	const categoriesDataFetch = useCallback(async () => {
		const response = await api.get('/categories')
		const responseData = response.data.map((item: any) => ({
			value: item.id,
			label: item.title,
		}))
		setCategories(responseData)
	}, [])

	useEffect(() => {
		categoriesDataFetch()
	}, [categoriesDataFetch])

	const handleSelectedCategory = (selectedOption: ICategoriesProps | null) => {
		setSelectedCategories(selectedOption);
	}

	const handleModalOpen = () => {
		modalRef.current?.handleModalOpen()
	}

	return (
		<main>
			<Menu />
			<div className="flex">
				<Sidebar
					className="h-screen w-[20%] bg-slate-200"
					onCategoryClick={handleCategoryClick}
				/>
				<div className="flex flex-col w-full">
					<header className="flex w-full justify-between items-center ">
						<h1 className="ml-2 font-semibold">Lista de tarefas</h1>
						<div className="w-[200px] m-2">
							<ButtonSuccess onClick={handleModalOpen}>
								Criar nova tarefa
							</ButtonSuccess>
						</div>
					</header>
					<div className="max-w-full grid grid-flow-row space-y-4 p-2">
						<Category categoryId={selectedCategory}  />
					</div>
				</div>
			</div>
			<ModalWindow
				ref={modalRef}
				contentLabel="Tem certeza que deseja sair?"
				title="Deseja criar uma nova tarefa?"
			>
				<main>
					<form className="space-y-6 w-[700px]">
						<InputForm
							type="text"
							name="Título da tarefa"
							value={title}
							placeholder="Título da tarefa"
							onChange={(event) => setTitle(event)}
						/>
						<InputForm
							type="text"
							name="O que irá fazer?"
							value={content}
							placeholder="Conteúdo da tarefa"
							onChange={(event) => setContent(event)}
						/>
						<InputSelect
							label="Categoria"
							options={categories}
							onChange={handleSelectedCategory}
						/>
						<ButtonSuccess type="submit" onClick={handleCreateTask}>
							Criar tarefa
						</ButtonSuccess>
					</form>
				</main>
			</ModalWindow>
		</main>
	)
}
