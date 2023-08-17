import { useCallback, useEffect, useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import { api } from '../../../services/apiClient'
import { Tasks } from '../../Tasks'
import toast from 'react-hot-toast'

interface ICategoriesProps {
	id: string
	title: string
	created_at: Date
	task: ITasksProps[]
}

interface ITasksProps {
	id: string
	title: string
	content: string
	progress?: number
	concluded?: boolean
	created_at: Date
}

interface ICategoryIdProps {
	categoryId?: string;
}

export const Category = ({ categoryId }: ICategoryIdProps) => {
	const [categories, setCategories] = useState<ICategoriesProps | null>(null)

	const categoriesDataFetch = useCallback(async () => {
		try {
			if (categoryId) {
				const response = await api.get(`/category/${categoryId}`)
				setCategories(response.data)
			}
		} catch {
			toast.error('Erro ao buscar dados da categoria')
		}
	}, [categoryId])

	useEffect(() => {
		categoriesDataFetch()
	}, [categoriesDataFetch])

	return (
		<>
			{categories && (
				<div
					key={categories.id}
					className="bg-slate-200 rounded-lg shadow-md"
				>
					<div className="flex items-center justify-between">
						<h3 className="m-2 h-6 font-semibold text-gray-500">
							{categories.title.toUpperCase()}
						</h3>
						<MdMoreHoriz className="m-2 h-6 font-semibold text-gray-500 text-3xl cursor-pointer" />
					</div>
					<div
						key={categories.id}
						className="grid grid-cols-6 gap-2 px-2 mb-2"
					>
						{categories && categories.task.map((task) => (
							<Tasks key={task.id} task={task} />
						))}
					</div>
				</div>
			)}
		</>
	)
}
