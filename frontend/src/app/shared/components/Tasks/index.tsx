import { useCallback, useEffect, useRef, useState } from "react";
import { ModalWindow } from "../ui/ModalWindow";
import { InputForm } from "../ui/InputForm";
import { ButtonSuccess } from "../ui/Buttons/ButtonSuccess";
import { InputSelect } from "../ui/InputSelect";
import { ICategoriesProps } from "../../../pages/Dashboard";
import { api } from "../../services/apiClient";
import { ButtonError } from "../ui/Buttons/ButtonError";
import toast from "react-hot-toast";

export interface ITasksProps {
	task: {
		id: string;
		title: string;
		content: string;
		progress?: number;
		concluded?: boolean;
		created_at: Date;
	}
}

export const Tasks = (props: ITasksProps) => {
	const modalRef = useRef<any>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [progress, setProgress] = useState<number | undefined>(undefined);
	const [concluded, setConcluded] = useState<boolean | undefined>(false);
	const [options, setOptions] = useState([
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	]);
	const [categories, setCategories] = useState<ICategoriesProps[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<ICategoriesProps | null>(null);

	const taskDataFetch = useCallback(async () => {
		const response = await api.get(`/tasks/${props.task.id}`);
		setTitle(response.data.title);
		setContent(response.data.content);
		setProgress(response.data.progress);
		setConcluded(response.data.concluded);
	}, [props.task.id]);

	useEffect(() => {
		taskDataFetch();
	}, [taskDataFetch]);
	
    const handleModalOpen = () => {
        modalRef.current?.handleModalOpen();
	}

	const handleSelectedCategory = (selectedOption: ICategoriesProps | null) => {
		setSelectedCategories(selectedOption);
	}

    return (
        <>
            <div
                className='h-[180px] w-full p-4 bg-white rounded-lg border-solid border-2 cursor-pointer'
                onClick={handleModalOpen}
            >
                <h1>{props.task.title}</h1>
                <p>{props.task.content}</p>
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
							label="Categorias"
							options={categories}
							onChange={handleSelectedCategory}
						/>
						<div className='grid grid-cols-2 gap-2'>
							<ButtonError
								type="submit"
							>
								Excluir tarefa
							</ButtonError>
							<ButtonSuccess
								type="submit"
							>
								atualizar tarefa
							</ButtonSuccess>
						</div>
					</form>
				</main>
			</ModalWindow>
        </>
    )
}